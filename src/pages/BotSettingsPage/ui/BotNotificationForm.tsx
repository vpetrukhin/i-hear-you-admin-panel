import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useBotMessageQuery } from "../lib/useBotMessageQuery";
import { useNotificationChange } from "../lib/useBotNotificationChange";

const maxLength = 1000;

export const BotNotificationForm = () => {
  const notificationQuery = useBotMessageQuery({ key: 'reminder_message' })

  const { onNotificationChange } = useNotificationChange()

  const form = useForm({
    defaultValues: {
      message: notificationQuery.data?.text,
    },
    onSubmit: async ({ value }) => {
      if (!value.message) {
        return
      }

      // await onSubmit(value);
      await onNotificationChange({ text: value.message, comment: '' })
    },
  });

  return (
    <Box
      sx={{
        width: 'max(30%, 400px)',
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        p: 4,
        boxShadow: "0px 4px 25px rgba(0,0,0,0.05)"
      }}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#2B2735"
            }}
          >
            Уведомление
          </Typography>

          <Typography
            sx={{
              fontSize: "13px",
              color: "#686868",
              lineHeight: 1.4
            }}
          >
            Уведомление будет отправляться всем пользователям бота раз в 10 дней
          </Typography>
        </Stack>

        <form.Field
          name="message"
          validators={{
            onChange: ({ value }) =>
              !value ? "Введите текст уведомления" :
                value.length > maxLength ? "Превышено максимальное количество символов" :
                  undefined,
          }}
        >
          {(field) => (
            <Box>
              <TextField
                multiline
                disabled={notificationQuery.isLoading}
                rows={6}
                placeholder="Введите текст уведомления"
                fullWidth
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={!!field.state.meta.errors.length}
                helperText={field.state.meta.errors[0]}
                inputProps={{ maxLength }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fafafa"
                  }
                }}
              />

              {/* Счётчик */}
              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: "14px",
                  color: "#5C5C5C",
                  textAlign: "left"
                }}
              >
                {field.state.value?.length}/{maxLength}
              </Typography>
            </Box>
          )}
        </form.Field>

        <Button
          type="submit"
          variant="contained"
          disabled={form.state.isSubmitting || notificationQuery.isLoading}
          sx={{
            backgroundColor: "#D3FF7A",
            color: "#1A1A1A",
            fontSize: "16px",
            fontWeight: 600,
            py: 2,
            borderRadius: "16px",
            "&:hover": {
              backgroundColor: "#C8F86D"
            }
          }}
        >
          {form.state.isSubmitting ? "СОХРАНЕНИЕ..." : "СОХРАНИТЬ"}
        </Button>
      </Stack>
    </Box>
  );
};
