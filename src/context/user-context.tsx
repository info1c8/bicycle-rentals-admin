import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: string;
  joinDate: Date;
  totalRentals: number;
  bonusPoints: number;
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
  };
}

interface UserContextType {
  user: UserProfile | null;
  isLoading: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const loadUser = async () => {
      try {
        // In a real app, this would be an API call
        const mockUser: UserProfile = {
          id: '1',
          name: 'Иван Петров',
          email: 'ivan@example.com',
          phone: '+7 (999) 123-45-67',
          avatar: 'https://i.pravatar.cc/150?img=3',
          address: 'г. Москва, ул. Пушкина, д. 10',
          joinDate: new Date('2024-01-15'),
          totalRentals: 8,
          bonusPoints: 450,
          preferences: {
            emailNotifications: true,
            smsNotifications: true,
            marketingEmails: false,
          },
        };

        setUser(mockUser);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      // Simulate API call
      setUser(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const updatePreferences = async (preferences: Partial<UserProfile['preferences']>) => {
    try {
      setUser(prev => 
        prev ? {
          ...prev,
          preferences: { ...prev.preferences, ...preferences }
        } : null
      );
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Simulate logout
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoading, updateProfile, updatePreferences, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;