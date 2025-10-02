import {
  PATHS_LIST,
  useCategoriesList,
  useTopicsList,
} from "@/entities/Materials";
import { type ChangeEvent, type FormEvent } from "react";
import type { CreateFormStateType } from "./MaterialsList";
import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  formState: CreateFormStateType;
  changeFormState: (newState: Partial<CreateFormStateType>) => void;
  onCancel: () => void;
  onSubmit: (ev: FormEvent) => void;
}

export const CreateMaterialForm = (
  { formState, changeFormState, onCancel, onSubmit }: Props,
) => {
  const { data: categoriesList } = useCategoriesList();
  const { data: topicsList } = useTopicsList();

  const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    changeFormState({ name: ev.target.value });
  };

  const handleDescriptionChange = (ev: ChangeEvent<HTMLInputElement>) => {
    changeFormState({ description: ev.target.value });
  };

  const handleCategoriesChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const currCategory = categoriesList?.find((item) => {
      return item.id === Number(ev.target.value);
    });

    changeFormState({ category: currCategory ?? null });
  };

  const handleTopicChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const currTopic = topicsList?.find((item) => {
      return item.id === Number(ev.target.value);
    });

    changeFormState({ topic: currTopic ?? null });
  };

  const handlePathsChange = (id: number) => {
    if (formState.paths.includes(id)) {
      changeFormState({ paths: formState.paths.filter((item) => item !== id) });
      return;
    }

    changeFormState({ paths: [...formState.paths, id] });
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Stack spacing={5}>
        <TextField
          variant="standard"
          onChange={handleNameChange}
          label="Название файла"
          value={formState.name}
        />
        <TextField
          onChange={handleDescriptionChange}
          value={formState.description}
          variant="standard"
          label="Описание (необязательно)"
        />

        <Stack direction="row" spacing={4}>
          <TextField
            sx={{
              width: "100%",
            }}
            id="category-select"
            select
            label="Категория"
            defaultValue=""
            variant="standard"
            onChange={handleCategoriesChange}
          >
            {categoriesList?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{
              width: "100%",
            }}
            id="topic-select"
            select
            label="Тема (необязательно)"
            value={formState.topic?.name ?? undefined}
            defaultValue=""
            variant="standard"
            onChange={handleTopicChange}
          >
            {topicsList?.map((option) => (
              <MenuItem value={option.id} key={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>

      <Typography sx={{ pt: "20px" }}>
        Контекст
      </Typography>

      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {PATHS_LIST.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value.id}
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={() => handlePathsChange(value.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={formState.paths.includes(value.id)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={value.name}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Typography variant="body1" color="textDisabled">
        Выберите один или оба варианта
      </Typography>
      <Stack
        direction="row"
        justifyContent="end"
        spacing={2}
        sx={{ width: "100%", pt: "24px" }}
      >
        <Button
          variant="contained"
          onClick={onCancel}
          sx={{ backgroundColor: "#2B2735" }}
        >
          Отмена
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7751FF" }}
          type="submit"
        >
          Сохранить
        </Button>
      </Stack>
    </Box>
  );
};
