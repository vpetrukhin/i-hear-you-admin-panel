import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { theme } from "@/app/theme";

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

export const LoginForm: React.FC<LoginFormProps> = ({
  isLoading,
  errors,
  onSubmit,
}) => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password) {
      onSubmit({ email: email, password });
    }
  };

  const isDisabled = !email || !password;

  const textFieldSx = {
    InputLabelProps: {
      sx: {
        fontSize: "13px",
        lineHeight: "140%",
        color: "#686868",
        fontWeight: 400,
        mb: "6px",
      },
    },
    InputProps: {
      sx: {
        height: "30px",
        backgroundColor: "transparent",
        borderRadius: 0,
        py: 0,
        "& .MuiInput-underline:before": {
          borderBottom: "1px solid #686868",
        },
        "& .MuiInput-underline:after": {
          borderBottom: "1px solid #686868",
        },
        "&:hover .MuiInput-underline:before": {
          borderBottom: "1px solid #686868",
        },
      },
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        minWidth: "200px",
        p: "20px",
        mx: "auto",
        borderRadius: 2,
        boxShadow: "4px 4px 20px 0px #6B6B6B26",
        zIndex: "2",
        mt: "8%",
        [theme.breakpoints.up("md")]: {
          width: "60.6%",
          minWidth: "300px",
          p: "40px",
        },
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{
          color: "#2B2735",
          fontSize: "14px",
          lineHeight: "140%",
          fontWeight: "600",
          mb: "40px",
        }}
      >
        Введите адрес электронной почты и&nbsp;пароль, чтобы&nbsp;войти
        в&nbsp;аккаунт
      </Typography>

      {errors?.common && (
        <Alert sx={{ marginBottom: 3 }} severity="error">
          {errors.common}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          variant="standard"
          label="Email"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          error={!!errors?.email}
          helperText={errors?.email}
          {...textFieldSx}
        />

        <TextField
          variant="standard"
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          error={!!errors?.password}
          helperText={errors?.password}
          sx={{
            mt: "20px",
            borderTop: "none",
            borderBottom: "1px solid #686868",
          }}
          {...textFieldSx}
        />

        <Button
          loading={isLoading}
          type="submit"
          variant="contained"
          color="primary"
          disabled={isDisabled}
          fullWidth
          sx={{
            mt: "40px",
            fontSize: "16px",
            lineHeight: "140%",
            fontWeight: "600",
            color: "#FFFFFF",
            textTransform: "uppercase",
            py: "8px",
            backgroundColor: "#2B2735",
            borderRadius: "4px",
            boxShadow: "none",
          }}
        >
          Войти
        </Button>
      </Box>
    </Paper>
  );
};
