import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Tab,
  Tabs,
  TextField,
  Button,
  Avatar,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Person as PersonIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Assessment as AuditIcon,
  AccountBalanceWallet as WalletIcon,
  AdminPanelSettings as AccessIcon,
  Api as IntegrationIcon,
  PhotoCamera as PhotoIcon,
  Key as KeyIcon,
  Shield as ShieldIcon,
  History as HistoryIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
// import authService from '../api/authService';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ProfileSettings = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [apiKeyDialog, setApiKeyDialog] = useState(false);
  const [walletDialog, setWalletDialog] = useState(false);

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: '',
    bio: ''
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    sessionTimeout: 30,
    ipWhitelist: []
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    kycAlerts: true,
    systemAlerts: true,
    assetAlerts: true,
    complianceAlerts: true,
    tokenizationAlerts: true
  });

  const [platformSettings, setPlatformSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    dashboardLayout: 'default'
  });

  const [blockchainSettings, setBlockchainSettings] = useState({
    preferredNetwork: 'ethereum',
    gasFeePreference: 'standard',
    walletAddresses: [],
    multiSigRequired: false,
    multiSigThreshold: 2,
    autoApprovalLimit: 10000
  });

  const [apiKeys, setApiKeys] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    loadUserData();
    loadSecurityData();
    loadAuditData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setPersonalInfo({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        jobTitle: userData.jobTitle || 'Platform Administrator',
        department: userData.department || 'Blockchain Operations',
        bio: userData.bio || ''
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadSecurityData = async () => {
    // Mock data - replace with actual API calls
    setApiKeys([
      { id: 1, name: 'Production API', key: 'pk_live_****', created: '2024-01-15', lastUsed: '2024-06-20' },
      { id: 2, name: 'Analytics API', key: 'pk_analytics_****', created: '2024-03-01', lastUsed: '2024-06-19' }
    ]);

    setLoginHistory([
      { id: 1, ip: '192.168.1.100', location: 'New York, US', device: 'Chrome on Windows', timestamp: '2024-06-21 09:30:00' },
      { id: 2, ip: '10.0.0.50', location: 'London, UK', device: 'Firefox on Mac', timestamp: '2024-06-20 15:45:00' },
      { id: 3, ip: '172.16.0.25', location: 'Tokyo, JP', device: 'Safari on iOS', timestamp: '2024-06-20 08:20:00' }
    ]);
  };

  const loadAuditData = async () => {
    // Mock audit data
    setAuditLogs([
      { id: 1, action: 'Asset Tokenization Approved', details: 'Property #12345 - $2.5M', timestamp: '2024-06-21 10:15:00' },
      { id: 2, action: 'KYC Document Reviewed', details: 'User ID: 789 - Approved', timestamp: '2024-06-21 09:30:00' },
      { id: 3, action: 'Smart Contract Deployed', details: 'Token: RWAT-001 on Ethereum', timestamp: '2024-06-20 16:45:00' },
      { id: 4, action: 'Compliance Report Generated', details: 'Monthly AML Report', timestamp: '2024-06-20 14:20:00' }
    ]);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

    const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to update personal info
      setSuccessMessage('Personal information updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating personal info:', error);
      setErrorMessage('Failed to update personal information');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      setErrorMessage('New passwords do not match');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    setLoading(true);
    try {
      // API call to change password
      setSuccessMessage('Password changed successfully');
      setSecuritySettings({ ...securitySettings, currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage('Failed to change password');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setLoading(false);
  };

  const handleNotificationSave = async () => {
    setLoading(true);
    try {
      // Make API call to update notification settings
      const response = await fetch('/api/auth/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(notificationSettings)
      });

      if (!response.ok) {
        throw new Error('Failed to update notification settings');
      }

      setSuccessMessage('Notification preferences saved successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving notification settings:', error);
      setErrorMessage(error.message || 'Failed to save notification settings');
      setTimeout(() => setErrorMessage(''), 3000);
    }
    setLoading(false);
  };

  const generateApiKey = () => {
    const newKey = {
      id: Date.now(),
      name: 'New API Key',
      key: `pk_${Math.random().toString(36).substr(2, 20)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never'
    };
    setApiKeys([...apiKeys, newKey]);
    setApiKeyDialog(false);
  };

  const deleteApiKey = (keyId) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
  };

  const addWalletAddress = () => {
    const newAddress = {
      id: Date.now(),
      address: '0x' + Math.random().toString(16).substr(2, 40),
      network: 'ethereum',
      type: 'admin',
      verified: false
    };
    setBlockchainSettings({
      ...blockchainSettings,
      walletAddresses: [...blockchainSettings.walletAddresses, newAddress]
    });
    setWalletDialog(false);
  };

  const tabs = [
    { label: 'Personal Info', icon: <PersonIcon /> },
    { label: 'Security', icon: <SecurityIcon /> },
    { label: 'Notifications', icon: <NotificationsIcon /> },
    { label: 'Platform', icon: <SettingsIcon /> },
    { label: 'Blockchain', icon: <WalletIcon /> },
    { label: 'Access Control', icon: <AccessIcon /> },
    { label: 'Audit & Logs', icon: <AuditIcon /> },
    { label: 'Integrations', icon: <IntegrationIcon /> }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Admin Profile Settings
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 3 }}>
        Manage your account settings, security preferences, and platform configurations
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="profile settings tabs"
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
                sx={{ minHeight: 72 }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Personal Information Tab */}
        <TabPanel value={currentTab} index={0}>
          <Box component="form" onSubmit={handlePersonalInfoSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                      src="/api/placeholder/120/120"
                    >
                      {personalInfo.firstName?.[0]}{personalInfo.lastName?.[0]}
                    </Avatar>
                    <Button
                      variant="outlined"
                      startIcon={<PhotoIcon />}
                      component="label"
                    >
                      Change Photo
                      <input type="file" hidden accept="image/*" />
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Job Title"
                      value={personalInfo.jobTitle}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, jobTitle: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Department"
                      value={personalInfo.department}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, department: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      multiline
                      rows={3}
                      value={personalInfo.bio}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  Save Personal Information
                </Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={currentTab} index={1}>
          <Grid container spacing={3}>
            {/* Password Change */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="Change Password"
                  avatar={<KeyIcon color="primary" />}
                />
                <CardContent>
                  <Box component="form" onSubmit={handlePasswordChange}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type={showPassword ? 'text' : 'password'}
                      value={securitySettings.currentPassword}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, currentPassword: e.target.value })}
                      margin="normal"
                      required
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        )
                      }}
                    />
                    <TextField
                      fullWidth
                      label="New Password"
                      type="password"
                      value={securitySettings.newPassword}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      value={securitySettings.confirmPassword}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                      margin="normal"
                      required
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{ mt: 2 }}
                    >
                      Change Password
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Two-Factor Authentication */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="Two-Factor Authentication"
                  avatar={<ShieldIcon color="primary" />}
                />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.twoFactorEnabled}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorEnabled: e.target.checked })}
                      />
                    }
                    label="Enable 2FA"
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Add an extra layer of security to your account
                  </Typography>
                  {securitySettings.twoFactorEnabled && (
                    <Button variant="outlined" sx={{ mt: 2 }}>
                      Configure 2FA
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* API Keys Management */}
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title="API Keys"
                  action={
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setApiKeyDialog(true)}
                    >
                      Generate New Key
                    </Button>
                  }
                />
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Key</TableCell>
                          <TableCell>Created</TableCell>
                          <TableCell>Last Used</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {apiKeys.map((key) => (
                          <TableRow key={key.id}>
                            <TableCell>{key.name}</TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                {key.key}
                              </Typography>
                            </TableCell>
                            <TableCell>{key.created}</TableCell>
                            <TableCell>{key.lastUsed}</TableCell>
                            <TableCell>
                              <IconButton
                                color="error"
                                onClick={() => deleteApiKey(key.id)}
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Login History */}
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title="Recent Login Activity"
                  avatar={<HistoryIcon color="primary" />}
                />
                <CardContent>
                  <List>
                    {loginHistory.map((login) => (
                      <ListItem key={login.id}>
                        <ListItemText
                          primary={`${login.location} - ${login.device}`}
                          secondary={`IP: ${login.ip} • ${login.timestamp}`}
                        />
                        <Chip
                          label="Verified"
                          color="success"
                          size="small"
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={currentTab} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Notification Channels" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                      />
                    }
                    label="Email Notifications"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.checked })}
                      />
                    }
                    label="SMS Notifications"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })}
                      />
                    }
                    label="Push Notifications"
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Alert Categories" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.kycAlerts}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, kycAlerts: e.target.checked })}
                      />
                    }
                    label="KYC/KYB Alerts"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.systemAlerts}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, systemAlerts: e.target.checked })}
                      />
                    }
                    label="System Alerts"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.assetAlerts}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, assetAlerts: e.target.checked })}
                      />
                    }
                    label="Asset Tokenization Alerts"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.complianceAlerts}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, complianceAlerts: e.target.checked })}
                      />
                    }
                    label="Compliance Alerts"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.tokenizationAlerts}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, tokenizationAlerts: e.target.checked })}
                      />
                    }
                    label="Smart Contract Alerts"
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleNotificationSave}
                disabled={loading}
              >
                Save Notification Preferences
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Platform Settings Tab */}
        <TabPanel value={currentTab} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Theme</InputLabel>
                <Select
                  value={platformSettings.theme}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, theme: e.target.value })}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="auto">Auto</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Language</InputLabel>
                <Select
                  value={platformSettings.language}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, language: e.target.value })}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                  <MenuItem value="zh">Chinese</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={platformSettings.timezone}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, timezone: e.target.value })}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="America/New_York">Eastern Time</MenuItem>
                  <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                  <MenuItem value="Europe/London">London</MenuItem>
                  <MenuItem value="Asia/Tokyo">Tokyo</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Currency</InputLabel>
                <Select
                  value={platformSettings.currency}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, currency: e.target.value })}
                >
                  <MenuItem value="USD">USD ($)</MenuItem>
                  <MenuItem value="EUR">EUR (€)</MenuItem>
                  <MenuItem value="GBP">GBP (£)</MenuItem>
                  <MenuItem value="JPY">JPY (¥)</MenuItem>
                  <MenuItem value="ETH">ETH (Ξ)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Date Format</InputLabel>
                <Select
                  value={platformSettings.dateFormat}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, dateFormat: e.target.value })}
                >
                  <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                  <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                  <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Dashboard Layout</InputLabel>
                <Select
                  value={platformSettings.dashboardLayout}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, dashboardLayout: e.target.value })}
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="compact">Compact</MenuItem>
                  <MenuItem value="expanded">Expanded</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Blockchain Settings Tab */}
        <TabPanel value={currentTab} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Network Preferences" />
                <CardContent>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Preferred Network</InputLabel>
                    <Select
                      value={blockchainSettings.preferredNetwork}
                      onChange={(e) => setBlockchainSettings({ ...blockchainSettings, preferredNetwork: e.target.value })}
                    >
                      <MenuItem value="ethereum">Ethereum Mainnet</MenuItem>
                      <MenuItem value="polygon">Polygon</MenuItem>
                      <MenuItem value="bsc">Binance Smart Chain</MenuItem>
                      <MenuItem value="avalanche">Avalanche</MenuItem>
                      <MenuItem value="arbitrum">Arbitrum</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel>Gas Fee Preference</InputLabel>
                    <Select
                      value={blockchainSettings.gasFeePreference}
                      onChange={(e) => setBlockchainSettings({ ...blockchainSettings, gasFeePreference: e.target.value })}
                    >
                      <MenuItem value="slow">Slow (Low Cost)</MenuItem>
                      <MenuItem value="standard">Standard</MenuItem>
                      <MenuItem value="fast">Fast (High Priority)</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Multi-Signature Settings" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={blockchainSettings.multiSigRequired}
                        onChange={(e) => setBlockchainSettings({ ...blockchainSettings, multiSigRequired: e.target.checked })}
                      />
                    }
                    label="Require Multi-Signature"
                  />
                  
                  {blockchainSettings.multiSigRequired && (
                    <TextField
                      fullWidth
                      label="Signature Threshold"
                      type="number"
                      value={blockchainSettings.multiSigThreshold}
                      onChange={(e) => setBlockchainSettings({ ...blockchainSettings, multiSigThreshold: parseInt(e.target.value) })}
                      margin="normal"
                      InputProps={{ inputProps: { min: 1, max: 10 } }}
                    />
                  )}

                  <TextField
                    fullWidth
                    label="Auto-Approval Limit (USD)"
                    type="number"
                    value={blockchainSettings.autoApprovalLimit}
                    onChange={(e) => setBlockchainSettings({ ...blockchainSettings, autoApprovalLimit: parseInt(e.target.value) })}
                    margin="normal"
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title="Wallet Addresses"
                  action={
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setWalletDialog(true)}
                    >
                      Add Wallet
                    </Button>
                  }
                />
                <CardContent>
                  {blockchainSettings.walletAddresses.length === 0 ? (
                    <Typography color="textSecondary">No wallet addresses configured</Typography>
                  ) : (
                    <List>
                      {blockchainSettings.walletAddresses.map((wallet) => (
                        <ListItem key={wallet.id}>
                          <ListItemText
                            primary={wallet.address}
                            secondary={`${wallet.network} • ${wallet.type}`}
                          />
                          <Chip
                            label={wallet.verified ? 'Verified' : 'Pending'}
                            color={wallet.verified ? 'success' : 'warning'}
                            size="small"
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Access Control Tab */}
        <TabPanel value={currentTab} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Current Permissions" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemIcon><ShieldIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Full Admin Access" secondary="Complete platform control" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><WalletIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Asset Management" secondary="Create, modify, and approve tokenization" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><SecurityIcon color="success" /></ListItemIcon>
                      <ListItemText primary="KYC/KYB Management" secondary="Review and approve verifications" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><SettingsIcon color="success" /></ListItemIcon>
                      <ListItemText primary="System Configuration" secondary="Modify platform settings" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Approval Limits" />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Asset Tokenization Limit (USD)"
                    type="number"
                    defaultValue="10000000"
                    margin="normal"
                    helperText="Maximum value for single approval"
                  />
                  <TextField
                    fullWidth
                    label="KYC Batch Approval Limit"
                    type="number"
                    defaultValue="100"
                    margin="normal"
                    helperText="Maximum KYC approvals per batch"
                  />
                  <TextField
                    fullWidth
                    label="Smart Contract Deployment"
                    defaultValue="Unlimited"
                    margin="normal"
                    disabled
                    helperText="Full deployment rights"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Audit & Logs Tab */}
        <TabPanel value={currentTab} index={6}>
          <Card>
            <CardHeader title="Recent Activity Log" />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Details</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.details}</TableCell>
                        <TableCell>
                          <Chip label="Completed" color="success" size="small" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Integrations Tab */}
        <TabPanel value={currentTab} index={7}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="External Integrations" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="SumSub KYC/KYB"
                        secondary="Identity verification service"
                      />
                      <Chip label="Connected" color="success" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Chainlink Oracles"
                        secondary="Price feeds and data"
                      />
                      <Chip label="Connected" color="success" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="IPFS Storage"
                        secondary="Document storage"
                      />
                      <Chip label="Connected" color="success" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Email Service (SendGrid)"
                        secondary="Notification delivery"
                      />
                      <Chip label="Connected" color="success" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Onfido Verification"
                        secondary="Enhanced KYC compliance"
                      />
                      <Chip label="Connected" color="success" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Refinitiv World-Check"
                        secondary="AML & sanctions screening"
                      />
                      <Chip label="Connected" color="success" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Fireblocks Custody"
                        secondary="Digital asset custody"
                      />
                      <Chip label="Connected" color="success" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="DocuSign"
                        secondary="Electronic signature"
                      />
                      <Chip label="Connected" color="success" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Backup & Export" />
                <CardContent>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  >
                    Download Audit Logs
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  >
                    Export User Data
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  >
                    Backup Configuration
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  >
                    Export Compliance Reports
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  >
                    Download Asset Registry
                  </Button>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Last Backup
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    June 20, 2024 at 11:30 PM UTC
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Auto-backup: Every 24 hours
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ mt: 2 }}>
                <CardHeader title="Regulatory Compliance" />
                <CardContent>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="SEC Regulation Compliance"
                        secondary="Securities regulations"
                      />
                      <Chip label="Compliant" color="success" size="small" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="MiFID II Requirements"
                        secondary="European regulations"
                      />
                      <Chip label="Compliant" color="success" size="small" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="GDPR Data Protection"
                        secondary="Privacy compliance"
                      />
                      <Chip label="Compliant" color="success" size="small" />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="FINMA Guidelines"
                        secondary="Swiss regulatory compliance"
                      />
                      <Chip label="Compliant" color="success" size="small" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* API Key Generation Dialog */}
      <Dialog open={apiKeyDialog} onClose={() => setApiKeyDialog(false)}>
        <DialogTitle>Generate New API Key</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Key Name"
            margin="normal"
            placeholder="e.g., Production API, Analytics API"
          />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            This key will have the same permissions as your account. Store it securely.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApiKeyDialog(false)}>Cancel</Button>
          <Button onClick={generateApiKey} variant="contained">Generate</Button>
        </DialogActions>
      </Dialog>

      {/* Wallet Address Dialog */}
      <Dialog open={walletDialog} onClose={() => setWalletDialog(false)}>
        <DialogTitle>Add Wallet Address</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Wallet Address"
            margin="normal"
            placeholder="0x..."
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Network</InputLabel>
            <Select defaultValue="ethereum">
              <MenuItem value="ethereum">Ethereum</MenuItem>
              <MenuItem value="polygon">Polygon</MenuItem>
              <MenuItem value="bsc">BSC</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWalletDialog(false)}>Cancel</Button>
          <Button onClick={addWalletAddress} variant="contained">Add Wallet</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfileSettings; 