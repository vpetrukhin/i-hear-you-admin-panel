import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface LoginFormErrors {
  email?: string;
  password?: string;
  common?: string;
}

interface LoginFormProps {
  isLoading?: boolean;
  errors?: LoginFormErrors;
  onSubmit: (credentials: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = (
  { isLoading, errors, onSubmit },
) => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password) {
      onSubmit({ email: email, password });
    }
  };

  const isDisabled = !email || !password;

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

      {errors?.common && (
        <Alert sx={{ marginBottom: 3 }} severity="error">{errors.common}</Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            error={!!errors?.email}
            helperText={errors?.email}
          />

          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            error={!!errors?.password}
            helperText={errors?.password}
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
