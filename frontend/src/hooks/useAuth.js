import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION, REGISTER_MUTATION, LOGOUT_MUTATION } from '../graphql/auth';
import { useToast } from './use-toast';
import { useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const { user, isAuthenticated, login: contextLogin, logout: contextLogout } = useAuthContext();
  const { toast } = useToast();

  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.accountLogin.token) {
        // Use context to store auth data
        contextLogin(data.accountLogin.user, data.accountLogin.token);
        
        toast({
          title: "Login Successful",
          description: data.accountLogin.message,
        });
      } else {
        toast({
          title: "Login Failed",
          description: data.accountLogin.message,
          variant: "destructive"
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Login Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const [registerMutation, { loading: registerLoading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      if (data.accountRegister.token) {
        // Use context to store auth data
        contextLogin(data.accountRegister.user, data.accountRegister.token);
        
        toast({
          title: "Registration Successful",
          description: data.accountRegister.message,
        });
      } else {
        toast({
          title: "Registration Failed",
          description: data.accountRegister.message,
          variant: "destructive"
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Registration Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      contextLogout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
  });

  const login = async (email, password) => {
    try {
      await loginMutation({
        variables: {
          input: {
            email,
            password
          }
        }
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const register = async (userData) => {
    try {
      await registerMutation({
        variables: {
          input: {
            email: userData.email,
            password: userData.password,
            fullName: userData.name,
            phone: userData.phone,
            userType: userData.userType || 'CUSTOMER',
            customerCategory: userData.customerCategory || 'GENERAL'
          }
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const logout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      // Even if GraphQL logout fails, clear local data
      contextLogout();
    }
  };

  return {
    user,
    login,
    register,
    logout,
    loginLoading,
    registerLoading,
    isAuthenticated
  };
};
