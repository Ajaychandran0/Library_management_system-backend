export default function login(email, password, userRepository, authService) {
  if (!email || !password) {
    const error = "email and password must be provided";
    throw error;
  }

  return userRepository.findByEmail(email).then((user) => {
    if (!user) {
      const error = "Invalid email or password";
      throw error;
    }

    const isMatch = authService.compare(password, user.password);
    if (!isMatch) {
      const error = "Invalid email or password";
      throw error;
    }

    const payloads = {
      user: {
        id: user._id,
        email: user.email,
      },
    };

    return authService.generateToken(payloads);
  });
}
