import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Flag, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { mockSellerReviews } from '../../data/mockSeller';

const ReviewManagement = ({ seller }) => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState(mockSellerReviews);
  const [replyText, setReplyText] = useState({});

  const handleReply = (reviewId) => {
    const reply = replyText[reviewId];
    if (!reply?.trim()) return;

    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? {
            ...review,
            response: {
              text: reply.trim(),
              date: new Date().toISOString()
            }
          }
        : review
    ));

    setReplyText(prev => ({ ...prev, [reviewId]: '' }));
    
    toast({
      title: "Reply Posted",
      description: "Your response has been posted successfully.",
    });
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h1>
          <p className="text-gray-600">Manage customer reviews and respond to feedback</p>
        </div>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= averageRating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">Overall Rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {reviews.length}
            </div>
            <p className="text-gray-600">Total Reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {reviews.filter(r => !r.response).length}
            </div>
            <p className="text-gray-600">Pending Responses</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={review.customerAvatar}
                  alt={review.customerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold">{review.customerName}</h4>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="secondary">
                        Order #{review.orderId}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{review.helpful} helpful</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>

                  {/* Response */}
                  {review.response ? (
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-500">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">Your Response:</span>
                        <span className="text-xs text-gray-500">
                          {new Date(review.response.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.response.text}</p>
                    </div>
                  ) : (
                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <h5 className="font-semibold mb-2">Respond to this review:</h5>
                      <Textarea
                        placeholder="Thank the customer for their feedback and address their concerns..."
                        value={replyText[review.id] || ''}
                        onChange={(e) => setReplyText(prev => ({
                          ...prev,
                          [review.id]: e.target.value
                        }))}
                        rows={3}
                        className="mb-3"
                      />
                      <Button
                        onClick={() => handleReply(review.id)}
                        disabled={!replyText[review.id]?.trim()}
                        className="bg-red-600 hover:bg-red-700"
                        size="sm"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Post Response
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-600">
              Customer reviews will appear here once you start receiving orders
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewManagement;