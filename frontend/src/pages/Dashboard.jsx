import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProfileSettings from './ProfileSettings';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Paper,
  Container
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  PersonSearch as KYCIcon,
  People as UsersIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import authService from '../api/authService';

const drawerWidth = 250;

// Dashboard components
const DashboardHome = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Home
      </Typography>
      <Typography variant="body1">
        Welcome to the admin dashboard. Use the sidebar to navigate through different sections.
      </Typography>
    </Paper>
  </Container>
);

const KYCManagement = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        KYC/KYB Management
      </Typography>
      <Typography variant="body1">
        Manage KYC/KYB verifications here. Review customer documents and approve or reject submissions.
      </Typography>
    </Paper>
  </Container>
);

const UserManagement = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Typography variant="body1">
        Manage system users here. Add, edit, or remove user accounts and permissions.
      </Typography>
    </Paper>
  </Container>
);

const Dashboard = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Fetch latest user data from API
    const fetchUserProfile = async () => {
      try {
        const userData = await authService.getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    // Note: The logout function already handles the redirection
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'KYC Management', icon: <KYCIcon />, path: '/dashboard/kyc-management' },
    { text: 'User Management', icon: <UsersIcon />, path: '/dashboard/users' },
    { text: 'Profile Settings', icon: <PersonIcon />, path: '/dashboard/profile' }
  ];
  
  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user && `Welcome, ${user.firstName || user.email}`}
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" color="primary" fontWeight="bold">
            RWA Platform
          </Typography>
        </Toolbar>
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: '100vh',
          mt: '64px' // Height of AppBar
        }}
      >
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/kyc-management" element={<KYCManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/profile" element={<ProfileSettings />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard; 