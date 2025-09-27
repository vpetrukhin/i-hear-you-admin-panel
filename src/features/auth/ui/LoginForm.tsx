import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface LoginFormProps {
  isLoading?: boolean;
  onSubmit: (credentials: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = (
  { isLoading, onSubmit },
) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username && password) {
      onSubmit({ email: username, password });
    }
  };

  const isDisabled = !username || !password;

  return (
    <Paper
      elevation={3}
      sx={{
        width: "40%",
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Вход в систему
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button
            loading={isLoading}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isDisabled}
            fullWidth
          >
            Войти
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
