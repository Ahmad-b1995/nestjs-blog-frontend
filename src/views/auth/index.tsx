import { Button, Form, Input, Card } from 'antd';

const Auth = () => {

  const handleLogin = (values: {username: string, password: string}) => {
    // Dummy login function
    const { username, password } = values;
    
    // Simulate an API call to authenticate the user
    if (username === 'ghale.homa@gmail.com' && password === '09101473990') {
      // Simulate a JWT token
      const token = 'dummy-jwt-token';
      localStorage.setItem('token', token);
      window.location.href = '/blog/media';

    } else {
      // Display an error message (for simplicity, using alert here)
      alert('Invalid username or password');
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 300, margin: 'auto', marginTop: '100px' }}>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Auth;
