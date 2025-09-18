import graphene
from packages.dyna_modules.models import User, Business, Item, Order, OrderItem, Review
from packages.pattern.service import Service
from packages.dyna_modules.database import get_db
from packages.context.context import GraphQLContext
from typing import Optional

# GraphQL Object Types
class UserType(graphene.ObjectType):
    id = graphene.Int()
    email = graphene.String()
    username = graphene.String()
    full_name = graphene.String()
    role = graphene.String()
    is_active = graphene.Boolean()
    created_at = graphene.DateTime()

class BusinessType(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    description = graphene.String()
    address = graphene.String()
    phone = graphene.String()
    email = graphene.String()
    website = graphene.String()
    is_active = graphene.Boolean()
    owner_id = graphene.Int()
    created_at = graphene.DateTime()

class ItemType(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    description = graphene.String()
    price = graphene.Float()
    category = graphene.String()
    stock_quantity = graphene.Int()
    is_active = graphene.Boolean()
    business_id = graphene.Int()
    created_at = graphene.DateTime()

class OrderType(graphene.ObjectType):
    id = graphene.Int()
    status = graphene.String()
    total_amount = graphene.Float()
    customer_id = graphene.Int()
    business_id = graphene.Int()
    created_at = graphene.DateTime()

class OrderItemType(graphene.ObjectType):
    id = graphene.Int()
    quantity = graphene.Int()
    price = graphene.Float()
    order_id = graphene.Int()
    item_id = graphene.Int()

class ReviewType(graphene.ObjectType):
    id = graphene.Int()
    rating = graphene.Int()
    comment = graphene.String()
    user_id = graphene.Int()
    business_id = graphene.Int()
    created_at = graphene.DateTime()

# Input Types
class UserInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    username = graphene.String(required=True)
    password = graphene.String(required=True)
    full_name = graphene.String()
    role = graphene.String()

class BusinessInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    description = graphene.String()
    address = graphene.String()
    phone = graphene.String()
    email = graphene.String()
    website = graphene.String()

class ItemInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    description = graphene.String()
    price = graphene.Float(required=True)
    category = graphene.String()
    stock_quantity = graphene.Int()
    business_id = graphene.Int(required=True)

class OrderInput(graphene.InputObjectType):
    business_id = graphene.Int(required=True)
    items = graphene.List(graphene.NonNull(graphene.Int), required=True)
    quantities = graphene.List(graphene.NonNull(graphene.Int), required=True)

# Query
class Query(graphene.ObjectType):
    # User queries
    user = graphene.Field(UserType, id=graphene.Int())
    users = graphene.List(UserType)
    
    # Business queries
    business = graphene.Field(BusinessType, id=graphene.Int())
    businesses = graphene.List(BusinessType)
    
    # Item queries
    item = graphene.Field(ItemType, id=graphene.Int())
    items = graphene.List(ItemType)
    items_by_business = graphene.List(ItemType, business_id=graphene.Int())
    
    # Order queries
    order = graphene.Field(OrderType, id=graphene.Int())
    orders = graphene.List(OrderType)
    orders_by_user = graphene.List(OrderType, user_id=graphene.Int())
    
    # Review queries
    review = graphene.Field(ReviewType, id=graphene.Int())
    reviews = graphene.List(ReviewType)
    reviews_by_business = graphene.List(ReviewType, business_id=graphene.Int())
    
    def resolve_user(self, info, id):
        context = info.context
        service = Service(User, context.db)
        user = service.get_by_id(id)
        if user:
            return UserType(
                id=user.id,
                email=user.email,
                username=user.username,
                full_name=user.full_name,
                role=user.role.value if user.role else None,
                is_active=user.is_active,
                created_at=user.created_at
            )
        return None
    
    def resolve_business(self, info, id):
        context = info.context
        service = Service(Business, context.db)
        business = service.get_by_id(id)
        if business:
            return BusinessType(
                id=business.id,
                name=business.name,
                description=business.description,
                address=business.address,
                phone=business.phone,
                email=business.email,
                website=business.website,
                is_active=business.is_active,
                owner_id=business.owner_id,
                created_at=business.created_at
            )
        return None
    
    def resolve_item(self, info, id):
        context = info.context
        service = Service(Item, context.db)
        item = service.get_by_id(id)
        if item:
            return ItemType(
                id=item.id,
                name=item.name,
                description=item.description,
                price=item.price,
                category=item.category,
                stock_quantity=item.stock_quantity,
                is_active=item.is_active,
                business_id=item.business_id,
                created_at=item.created_at
            )
        return None
    
    def resolve_items_by_business(self, info, business_id):
        context = info.context
        service = Service(Item, context.db)
        items = service.filter_by(business_id=business_id)
        return [ItemType(
            id=item.id,
            name=item.name,
            description=item.description,
            price=item.price,
            category=item.category,
            stock_quantity=item.stock_quantity,
            is_active=item.is_active,
            business_id=item.business_id,
            created_at=item.created_at
        ) for item in items]
    
    def resolve_order(self, info, id):
        context = info.context
        service = Service(Order, context.db)
        order = service.get_by_id(id)
        if order:
            return OrderType(
                id=order.id,
                status=order.status.value if order.status else None,
                total_amount=order.total_amount,
                customer_id=order.customer_id,
                business_id=order.business_id,
                created_at=order.created_at
            )
        return None
    
    def resolve_orders_by_user(self, info, user_id):
        context = info.context
        service = Service(Order, context.db)
        orders = service.filter_by(customer_id=user_id)
        return [OrderType(
            id=order.id,
            status=order.status.value if order.status else None,
            total_amount=order.total_amount,
            customer_id=order.customer_id,
            business_id=order.business_id,
            created_at=order.created_at
        ) for order in orders]
    
    def resolve_review(self, info, id):
        context = info.context
        service = Service(Review, context.db)
        review = service.get_by_id(id)
        if review:
            return ReviewType(
                id=review.id,
                rating=review.rating,
                comment=review.comment,
                user_id=review.user_id,
                business_id=review.business_id,
                created_at=review.created_at
            )
        return None
    
    def resolve_reviews_by_business(self, info, business_id):
        context = info.context
        service = Service(Review, context.db)
        reviews = service.filter_by(business_id=business_id)
        return [ReviewType(
            id=review.id,
            rating=review.rating,
            comment=review.comment,
            user_id=review.user_id,
            business_id=review.business_id,
            created_at=review.created_at
        ) for review in reviews]
    
    def resolve_users(self, info):
        context = info.context
        service = Service(User, context.db)
        users = service.get_all()
        return [UserType(
            id=user.id,
            email=user.email,
            username=user.username,
            full_name=user.full_name,
            role=user.role.value if user.role else None,
            is_active=user.is_active,
            created_at=user.created_at
        ) for user in users]
    
    def resolve_businesses(self, info):
        context = info.context
        service = Service(Business, context.db)
        businesses = service.get_all()
        return [BusinessType(
            id=business.id,
            name=business.name,
            description=business.description,
            address=business.address,
            phone=business.phone,
            email=business.email,
            website=business.website,
            is_active=business.is_active,
            owner_id=business.owner_id,
            created_at=business.created_at
        ) for business in businesses]
    
    def resolve_items(self, info):
        context = info.context
        service = Service(Item, context.db)
        items = service.get_all()
        return [ItemType(
            id=item.id,
            name=item.name,
            description=item.description,
            price=item.price,
            category=item.category,
            stock_quantity=item.stock_quantity,
            is_active=item.is_active,
            business_id=item.business_id,
            created_at=item.created_at
        ) for item in items]
    
    def resolve_orders(self, info):
        context = info.context
        service = Service(Order, context.db)
        orders = service.get_all()
        return [OrderType(
            id=order.id,
            status=order.status.value if order.status else None,
            total_amount=order.total_amount,
            customer_id=order.customer_id,
            business_id=order.business_id,
            created_at=order.created_at
        ) for order in orders]
    
    def resolve_reviews(self, info):
        context = info.context
        service = Service(Review, context.db)
        reviews = service.get_all()
        return [ReviewType(
            id=review.id,
            rating=review.rating,
            comment=review.comment,
            user_id=review.user_id,
            business_id=review.business_id,
            created_at=review.created_at
        ) for review in reviews]

# Mutations
class CreateUser(graphene.Mutation):
    class Arguments:
        user_data = UserInput(required=True)
    
    user = graphene.Field(UserType)
    
    def mutate(self, info, user_data):
        context = info.context
        service = Service(User, context.db)
        
        # Hash password
        from packages.middleware.auth import get_password_hash
        user_data_dict = dict(user_data)
        user_data_dict['hashed_password'] = get_password_hash(user_data_dict.pop('password'))
        
        user = service.create(**user_data_dict)
        return CreateUser(user=UserType(
            id=user.id,
            email=user.email,
            username=user.username,
            full_name=user.full_name,
            role=user.role.value if user.role else None,
            is_active=user.is_active,
            created_at=user.created_at
        ))

class CreateBusiness(graphene.Mutation):
    class Arguments:
        business_data = BusinessInput(required=True)
    
    business = graphene.Field(BusinessType)
    
    def mutate(self, info, business_data):
        context = info.context
        service = Service(Business, context.db)
        
        # Get current user from context
        if not context.is_authenticated():
            raise Exception("Authentication required")
        
        business_data_dict = dict(business_data)
        business_data_dict['owner_id'] = context.get_user_id()
        
        business = service.create(**business_data_dict)
        return CreateBusiness(business=BusinessType(
            id=business.id,
            name=business.name,
            description=business.description,
            address=business.address,
            phone=business.phone,
            email=business.email,
            website=business.website,
            is_active=business.is_active,
            owner_id=business.owner_id,
            created_at=business.created_at
        ))

class CreateItem(graphene.Mutation):
    class Arguments:
        item_data = ItemInput(required=True)
    
    item = graphene.Field(ItemType)
    
    def mutate(self, info, item_data):
        context = info.context
        service = Service(Item, context.db)
        
        item_data_dict = dict(item_data)
        item = service.create(**item_data_dict)
        return CreateItem(item=ItemType(
            id=item.id,
            name=item.name,
            description=item.description,
            price=item.price,
            category=item.category,
            stock_quantity=item.stock_quantity,
            is_active=item.is_active,
            business_id=item.business_id,
            created_at=item.created_at
        ))

class CreateOrder(graphene.Mutation):
    class Arguments:
        order_data = OrderInput(required=True)
    
    order = graphene.Field(OrderType)
    
    def mutate(self, info, order_data):
        context = info.context
        order_service = Service(Order, context.db)
        item_service = Service(Item, context.db)
        
        # Get current user from context
        if not context.is_authenticated():
            raise Exception("Authentication required")
        
        # Calculate total amount
        total_amount = 0
        for item_id, quantity in zip(order_data.items, order_data.quantities):
            item = item_service.get_by_id(item_id)
            if item:
                total_amount += item.price * quantity
        
        # Create order
        order = order_service.create(
            customer_id=context.get_user_id(),
            business_id=order_data.business_id,
            total_amount=total_amount
        )
        
        # Create order items
        from packages.dyna_modules.models import OrderItem
        for item_id, quantity in zip(order_data.items, order_data.quantities):
            item = item_service.get_by_id(item_id)
            if item:
                order_item = OrderItem(
                    order_id=order.id,
                    item_id=item_id,
                    quantity=quantity,
                    price=item.price
                )
                context.db.add(order_item)
        context.db.commit()
        
        return CreateOrder(order=OrderType(
            id=order.id,
            status=order.status.value if order.status else None,
            total_amount=order.total_amount,
            customer_id=order.customer_id,
            business_id=order.business_id,
            created_at=order.created_at
        ))

class CreateReview(graphene.Mutation):
    class Arguments:
        business_id = graphene.Int(required=True)
        rating = graphene.Int(required=True)
        comment = graphene.String()
    
    review = graphene.Field(ReviewType)
    
    def mutate(self, info, business_id, rating, comment=None):
        context = info.context
        service = Service(Review, context.db)
        
        # Get current user from context
        if not context.is_authenticated():
            raise Exception("Authentication required")
        
        review = service.create(
            user_id=context.get_user_id(),
            business_id=business_id,
            rating=rating,
            comment=comment
        )
        return CreateReview(review=ReviewType(
            id=review.id,
            rating=review.rating,
            comment=review.comment,
            user_id=review.user_id,
            business_id=review.business_id,
            created_at=review.created_at
        ))

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    create_business = CreateBusiness.Field()
    create_item = CreateItem.Field()
    create_order = CreateOrder.Field()
    create_review = CreateReview.Field()
