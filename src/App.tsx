import React, { useState } from 'react';
import { TextInput } from './components/TextInput';
import { Dropdown } from './components/Dropdown';
import { Checkbox } from './components/Checkbox';
import { RadioGroup } from './components/RadioGroup';
import { Alert } from './components/Alert';
import { Toast } from './components/Toast';
import { ProgressBar } from './components/ProgressBar';
import { Tooltip } from './components/Tooltip';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Badge } from './components/Badge';
import { Loader } from './components/Loader';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    notifications: false,
    preference: 'email'
  });
  
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission with progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsLoading(false);
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setShowErrorAlert(true);
          setTimeout(() => setShowErrorAlert(false), 5000);
        } else {
          setShowSuccessToast(true);
          setTimeout(() => setShowSuccessToast(false), 3000);
        }
      }
    }, 300);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Design System</h1>
            <ThemeToggle />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card title="Data Entry Components">
              <form onSubmit={handleSubmit} className="space-y-6">
                <TextInput
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={(value) => handleInputChange('name', value)}
                  placeholder="Enter your name"
                  required
                />
                
                <TextInput
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  placeholder="Enter your email"
                  type="email"
                  required
                />
                
                <Dropdown
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={(value) => handleInputChange('role', value)}
                  options={[
                    { value: 'developer', label: 'Developer' },
                    { value: 'designer', label: 'Designer' },
                    { value: 'manager', label: 'Manager' },
                    { value: 'other', label: 'Other' }
                  ]}
                  placeholder="Select your role"
                />
                
                <Checkbox
                  label="Receive notifications"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={(value) => handleInputChange('notifications', value)}
                />
                
                <RadioGroup
                  label="Notification Preference"
                  name="preference"
                  value={formData.preference}
                  onChange={(value) => handleInputChange('preference', value)}
                  options={[
                    { value: 'email', label: 'Email' },
                    { value: 'sms', label: 'SMS' },
                    { value: 'push', label: 'Push Notification' }
                  ]}
                />
                
                <div className="flex items-center space-x-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader size="sm" /> : 'Submit'}
                  </Button>
                  <Button variant="secondary" type="reset">Reset</Button>
                </div>
              </form>
            </Card>

            <Card title="Feedback Components">
              <div className="space-y-6">
                {showErrorAlert && (
                  <Alert 
                    type="error" 
                    title="Invalid Email" 
                    message="Please enter a valid email address."
                    onClose={() => setShowErrorAlert(false)}
                  />
                )}
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Progress Indicator</h3>
                  <ProgressBar value={progress} />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">New</Badge>
                    <Badge variant="success">Completed</Badge>
                    <Badge variant="warning">Pending</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Tooltips</h3>
                  <div className="flex flex-wrap gap-4">
                    <Tooltip content="This is a helpful tooltip">
                      <Button variant="outline" size="sm">Hover me</Button>
                    </Tooltip>
                    <Tooltip content="Another tooltip example" position="right">
                      <Button variant="outline" size="sm">Right tooltip</Button>
                    </Tooltip>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Loading States</h3>
                  <div className="flex gap-4">
                    <Loader size="sm" />
                    <Loader />
                    <Loader size="lg" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {showSuccessToast && (
          <Toast 
            type="success" 
            message="Form submitted successfully!"
            onClose={() => setShowSuccessToast(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;