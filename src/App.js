import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  Snackbar,
  Avatar,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const sampleInternships = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    type: 'Full-time',
    duration: '3 months',
    stipend: '$2,000/month',
    postedDate: '2024-01-15',
    description: 'We are looking for a frontend developer intern with React experience.',
    skills: ['React', 'JavaScript', 'CSS'],
    requirements: 'Currently enrolled in Computer Science program, knowledge of React and modern JavaScript.',
  },
  {
    id: 2,
    title: 'Backend Developer Intern',
    company: 'Data Systems LLC',
    location: 'New York, NY',
    type: 'Part-time',
    duration: '6 months',
    stipend: '$1,800/month',
    postedDate: '2024-01-10',
    description: 'Join our backend team working on scalable systems.',
    skills: ['Node.js', 'MySQL', 'API Development'],
    requirements: 'Experience with Node.js and databases, understanding of RESTful APIs.',
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    company: 'Creative Designs Co.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    duration: '4 months',
    stipend: '$1,900/month',
    postedDate: '2024-01-12',
    description: 'Create beautiful and functional user interfaces.',
    skills: ['Figma', 'UI Design', 'User Research'],
    requirements: 'Portfolio required, proficiency in Figma, understanding of design principles.',
  },
];

const InternshipCard = ({ internship, onApply, onViewDetails, isSaved, onToggleSave }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
    <IconButton
      sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
      onClick={() => onToggleSave(internship.id)}
      color={isSaved ? 'primary' : 'default'}
    >
      {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    </IconButton>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {internship.title}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {internship.company} • {internship.location}
      </Typography>
      <Box sx={{ my: 1 }}>
        <Chip label={internship.type} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
        <Chip label={internship.duration} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
        <Chip label={internship.stipend} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
      </Box>
      <Typography variant="body2" paragraph>
        {internship.description}
      </Typography>
      <Box sx={{ mt: 'auto' }}>
        {internship.skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            variant="outlined"
            size="small"
            sx={{ mr: 0.5, mb: 0.5 }}
          />
        ))}
      </Box>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary" onClick={() => onViewDetails(internship)}>
        View Details
      </Button>
      <Button size="small" color="primary" variant="contained" onClick={() => onApply(internship)}>
        Apply Now
      </Button>
    </CardActions>
  </Card>
);

const SearchFilters = ({ onSearch, onLocationChange, onTypeChange }) => (
  <Box sx={{ p: 2, bgcolor: 'background.paper', mb: 3, borderRadius: 1 }}>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          placeholder="Search internships by title, company, or skills..."
          onChange={(e) => onSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Grid>
      <Grid item xs={6} md={2}>
        <TextField
          fullWidth
          select
          label="Location"
          defaultValue=""
          onChange={(e) => onLocationChange(e.target.value)}
        >
          <MenuItem value="">All Locations</MenuItem>
          <MenuItem value="remote">Remote</MenuItem>
          <MenuItem value="new-york">New York</MenuItem>
          <MenuItem value="san-francisco">San Francisco</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={6} md={2}>
        <TextField
          fullWidth
          select
          label="Type"
          defaultValue=""
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="full-time">Full-time</MenuItem>
          <MenuItem value="part-time">Part-time</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FilterIcon />}
        >
          More Filters
        </Button>
      </Grid>
    </Grid>
  </Box>
);

const ApplicationDialog = ({ open, onClose, internship, userProfile, onSubmit }) => {
  const [formData, setFormData] = useState({
    coverLetter: '',
    resumeFileName: '',
    availableStartDate: '',
    expectedGraduation: '',
    additionalInfo: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, internshipId: internship.id });
    setFormData({
      coverLetter: '',
      resumeFileName: '',
      availableStartDate: '',
      expectedGraduation: '',
      additionalInfo: '',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Apply for {internship?.title}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle2" gutterBottom>
          {internship?.company} • {internship?.location}
        </Typography>
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              value={userProfile?.fullName || ''}
              disabled
              helperText="From your profile"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={userProfile?.email || ''}
              disabled
              helperText="From your profile"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={userProfile?.phone || ''}
              disabled
              helperText="From your profile"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Available Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.availableStartDate}
              onChange={(e) => handleChange('availableStartDate', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Expected Graduation"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.expectedGraduation}
              onChange={(e) => handleChange('expectedGraduation', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<AttachFileIcon />}
              component="label"
              fullWidth
            >
              Upload Resume
              <input type="file" hidden accept=".pdf,.doc,.docx" />
            </Button>
            {formData.resumeFileName && (
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {formData.resumeFileName}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Cover Letter"
              placeholder="Tell us why you're interested in this position..."
              value={formData.coverLetter}
              onChange={(e) => handleChange('coverLetter', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Additional Information"
              placeholder="Any additional information you'd like to share..."
              value={formData.additionalInfo}
              onChange={(e) => handleChange('additionalInfo', e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} startIcon={<SendIcon />}>
          Submit Application
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const InternshipDetailsDialog = ({ open, onClose, internship, onApply }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>
      {internship?.title}
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" color="primary">
          {internship?.company}
        </Typography>
        <Typography color="textSecondary">
          {internship?.location}
        </Typography>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Chip label={internship?.type} sx={{ mr: 1 }} />
        <Chip label={internship?.duration} sx={{ mr: 1 }} />
        <Chip label={internship?.stipend} />
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography paragraph>
        {internship?.description}
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Requirements
      </Typography>
      <Typography paragraph>
        {internship?.requirements}
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Required Skills
      </Typography>
      <Box sx={{ mb: 2 }}>
        {internship?.skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            variant="outlined"
            sx={{ mr: 0.5, mb: 0.5 }}
          />
        ))}
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
      <Button variant="contained" onClick={() => { onClose(); onApply(internship); }}>
        Apply Now
      </Button>
    </DialogActions>
  </Dialog>
);

const ProfileDialog = ({ open, onClose, profile, onSave }) => {
  const [formData, setFormData] = useState(profile || {
    fullName: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    graduationYear: '',
    gpa: '',
    skills: '',
    bio: '',
    linkedin: '',
    github: '',
    portfolio: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Edit Profile
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" gutterBottom>
              Education
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="University"
              value={formData.university}
              onChange={(e) => handleChange('university', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Major"
              value={formData.major}
              onChange={(e) => handleChange('major', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Graduation Year"
              value={formData.graduationYear}
              onChange={(e) => handleChange('graduationYear', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="GPA"
              value={formData.gpa}
              onChange={(e) => handleChange('gpa', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Skills"
              placeholder="e.g., React, Python, SQL (comma-separated)"
              value={formData.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="LinkedIn"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="GitHub"
              placeholder="https://github.com/yourusername"
              value={formData.github}
              onChange={(e) => handleChange('github', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Portfolio"
              placeholder="https://yourportfolio.com"
              value={formData.portfolio}
              onChange={(e) => handleChange('portfolio', e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CompanyDialog = ({ open, onClose, company, onSave }) => {
  const [formData, setFormData] = useState(company || {
    companyName: '',
    industry: '',
    website: '',
    location: '',
    size: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Company Profile
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Industry"
              value={formData.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Company Size"
              value={formData.size}
              onChange={(e) => handleChange('size', e.target.value)}
            >
              <MenuItem value="1-10">1-10 employees</MenuItem>
              <MenuItem value="11-50">11-50 employees</MenuItem>
              <MenuItem value="51-200">51-200 employees</MenuItem>
              <MenuItem value="201-500">201-500 employees</MenuItem>
              <MenuItem value="501+">501+ employees</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Website"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Company Description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Email"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Phone"
              value={formData.contactPhone}
              onChange={(e) => handleChange('contactPhone', e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Company Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [savedInternships, setSavedInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [userProfile, setUserProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    university: 'State University',
    major: 'Computer Science',
    graduationYear: '2025',
    gpa: '3.8',
    skills: 'React, JavaScript, Node.js, Python',
    bio: 'Passionate computer science student seeking internship opportunities.',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    portfolio: 'https://johndoe.dev',
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleApply = (internship) => {
    setSelectedInternship(internship);
    setApplicationDialogOpen(true);
  };

  const handleViewDetails = (internship) => {
    setSelectedInternship(internship);
    setDetailsDialogOpen(true);
  };

  const handleSubmitApplication = (applicationData) => {
    const newApplication = {
      ...applicationData,
      internship: selectedInternship,
      submittedDate: new Date().toISOString(),
      status: 'Pending',
    };
    setApplications([...applications, newApplication]);
    setApplicationDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'Application submitted successfully!',
      severity: 'success',
    });
  };

  const handleToggleSave = (internshipId) => {
    if (savedInternships.includes(internshipId)) {
      setSavedInternships(savedInternships.filter(id => id !== internshipId));
      setSnackbar({
        open: true,
        message: 'Internship removed from saved',
        severity: 'info',
      });
    } else {
      setSavedInternships([...savedInternships, internshipId]);
      setSnackbar({
        open: true,
        message: 'Internship saved!',
        severity: 'success',
      });
    }
  };

  const handleSaveProfile = (profileData) => {
    setUserProfile(profileData);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success',
    });
  };

  const handleSaveCompany = (companyData) => {
    setSnackbar({
      open: true,
      message: 'Company profile saved!',
      severity: 'success',
    });
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem button onClick={() => setTabValue(0)}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Browse Internships" />
        </ListItem>
        <ListItem button onClick={() => setTabValue(1)}>
          <ListItemIcon>
            <Badge badgeContent={applications.length} color="primary">
              <SendIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="My Applications" />
        </ListItem>
        <ListItem button onClick={() => setTabValue(2)}>
          <ListItemIcon>
            <Badge badgeContent={savedInternships.length} color="primary">
              <BookmarkIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Saved Internships" />
        </ListItem>
        <ListItem button onClick={() => setProfileDialogOpen(true)}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button onClick={() => setCompanyDialogOpen(true)}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Company Profile" />
        </ListItem>
      </List>
    </Box>
  );

  const renderContent = () => {
    if (tabValue === 0) {
      return (
        <>
          <SearchFilters />
          <Grid container spacing={3}>
            {sampleInternships.map((internship) => (
              <Grid item key={internship.id} xs={12} sm={6} lg={4}>
                <InternshipCard
                  internship={internship}
                  onApply={handleApply}
                  onViewDetails={handleViewDetails}
                  isSaved={savedInternships.includes(internship.id)}
                  onToggleSave={handleToggleSave}
                />
              </Grid>
            ))}
          </Grid>
        </>
      );
    } else if (tabValue === 1) {
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography color="textSecondary">
                      No applications yet. Start applying to internships!
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((app, index) => (
                  <TableRow key={index}>
                    <TableCell>{app.internship.title}</TableCell>
                    <TableCell>{app.internship.company}</TableCell>
                    <TableCell>
                      {new Date(app.submittedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={app.status}
                        color={app.status === 'Pending' ? 'warning' : 'success'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else if (tabValue === 2) {
      const saved = sampleInternships.filter(i => savedInternships.includes(i.id));
      return (
        <Grid container spacing={3}>
          {saved.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <BookmarkBorderIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography color="textSecondary">
                  No saved internships yet. Browse and save internships you're interested in!
                </Typography>
              </Paper>
            </Grid>
          ) : (
            saved.map((internship) => (
              <Grid item key={internship.id} xs={12} sm={6} lg={4}>
                <InternshipCard
                  internship={internship}
                  onApply={handleApply}
                  onViewDetails={handleViewDetails}
                  isSaved={true}
                  onToggleSave={handleToggleSave}
                />
              </Grid>
            ))
          )}
        </Grid>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <WorkIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              C.I.T
            </Typography>
            <Button color="inherit" onClick={() => setProfileDialogOpen(true)}>
              Profile
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { md: 250 }, flexShrink: { md: 0 } }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, top: '64px' },
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - 250px)` } }}>
          <Toolbar />
          
          <Container maxWidth="xl">
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Browse Internships" />
              <Tab label={`My Applications (${applications.length})`} />
              <Tab label={`Saved (${savedInternships.length})`} />
            </Tabs>

            {renderContent()}
          </Container>
        </Box>
      </Box>

      <ApplicationDialog
        open={applicationDialogOpen}
        onClose={() => setApplicationDialogOpen(false)}
        internship={selectedInternship}
        userProfile={userProfile}
        onSubmit={handleSubmitApplication}
      />

      <InternshipDetailsDialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        internship={selectedInternship}
        onApply={handleApply}
      />

      <ProfileDialog
        open={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
        profile={userProfile}
        onSave={handleSaveProfile}
      />

      <CompanyDialog
        open={companyDialogOpen}
        onClose={() => setCompanyDialogOpen(false)}
        onSave={handleSaveCompany}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;