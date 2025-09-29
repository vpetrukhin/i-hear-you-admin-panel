import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MaterialCreateForm } from "@/features/material/create/ui/MaterialCreateForm";
import { createContent, linkContentCategories } from "@/shared/api/content";
import { Page } from "@/widgets/Page";
import {Sidebar} from "@/widgets/Sidebar";
import { PageContent } from "@/widgets/PageContent";

const categories = [
    // 1. О проекте (себе+ребенок)
    { id: "about", title: "О проекте", groups: ["self", "child"] },
    { id: "about.who-we-are", title: "Кто мы", path: ["О проекте"], groups: ["self", "child"] },
    { id: "about.what-we-do", title: "Что мы делаем", path: ["О проекте"], groups: ["self", "child"] },
    { id: "about.achievements", title: "Наши достижения", path: ["О проекте"], groups: ["self", "child"] },
    { id: "about.annual-reports", title: "Годовые отчёты", path: ["О проекте"], groups: ["self", "child"] },
    { id: "about.docs", title: "Документы", path: ["О проекте"], groups: ["self", "child"] },

    // 2. Диагностика и причины (себе+ребенок)
    { id: "diagnostics", title: "Диагностика и причины", groups: ["self", "child"] },
    { id: "diagnostics.about", title: "Что такое нарушение слуха", path: ["Диагностика и причины"], groups: ["self", "child"] },
    { id: "diagnostics.first-signs", title: "Первые признаки", path: ["Диагностика и причины"], groups: ["self", "child"] },
    { id: "diagnostics.online-test", title: "Проверка слуха онлайн", path: ["Диагностика и причины"], groups: ["self", "child"] },
    { id: "diagnostics.where-to-go", title: "К какому врачу обратиться", path: ["Диагностика и причины"], groups: ["self", "child"] },
    { id: "diagnostics.causes", title: "Причины потери слуха", path: ["Диагностика и причины"], groups: ["self", "child"] },

    // 3. Слуховые аппараты (себе+ребенок)
    { id: "hearing-aids", title: "Слуховые аппараты", groups: ["self", "child"] },
    { id: "hearing-aids.types", title: "Виды аппаратов", path: ["Слуховые аппараты"], groups: ["self", "child"] },
    { id: "hearing-aids.fitting", title: "Подбор и настройка", path: ["Слуховые аппараты"], groups: ["self", "child"] },
    { id: "hearing-aids.care", title: "Уход за аппаратами", path: ["Слуховые аппараты"], groups: ["self", "child"] },
    { id: "hearing-aids.earmolds", title: "Ушные вкладыши", path: ["Слуховые аппараты"], groups: ["self", "child"] },
    { id: "hearing-aids.whistling", title: "Почему аппарат свистит", path: ["Слуховые аппараты"], groups: ["self", "child"] },
    { id: "hearing-aids.adaptation", title: "Адаптация к аппаратам", path: ["Слуховые аппараты"], groups: ["self", "child"] },

    // 4. Кохлеарная имплантация (себе+ребенок)
    { id: "ci", title: "Кохлеарная имплантация", groups: ["self", "child"] },
    { id: "ci.what", title: "Что такое КИ", path: ["Кохлеарная имплантация"], groups: ["self", "child"] },
    { id: "ci.indications", title: "Показания к операции", path: ["Кохлеарная имплантация"], groups: ["self", "child"] },
    { id: "ci.process", title: "Процесс имплантации", path: ["Кохлеарная имплантация"], groups: ["self", "child"] },
    { id: "ci.rehab", title: "Реабилитация после КИ", path: ["Кохлеарная имплантация"], groups: ["self", "child"] },
    { id: "ci.faq", title: "Часто задаваемые вопросы", path: ["Кохлеарная имплантация"], groups: ["self", "child"] },
    { id: "ci.stories", title: "Истории пациентов", path: ["Кохлеарная имплантация"], groups: ["self", "child"] },

    // 5. Обучение и развитие (ребенок)
    { id: "learning", title: "Обучение и развитие", groups: ["child"] },
    { id: "learning.hearing-dev", title: "Развитие слуха у ребёнка", path: ["Обучение и развитие"], groups: ["child"] },
    { id: "learning.speech", title: "Развитие речи", path: ["Обучение и развитие"], groups: ["child"] },
    { id: "learning.removes-aid", title: "Если ребёнок снимает аппарат", path: ["Обучение и развитие"], groups: ["child"] },
    { id: "learning.behavior", title: "Изменения в поведении", path: ["Обучение и развитие"], groups: ["child"] },
    { id: "learning.games", title: "Игры для развития", path: ["Обучение и развитие"], groups: ["child"] },

    // 6. Инклюзия в школе (ребенок)
    { id: "school-inclusion", title: "Инклюзия в школе", groups: ["child"] },
    { id: "school-inclusion.for-teachers", title: "Для учителей", path: ["Инклюзия в школе"], groups: ["child"] },
    { id: "school-inclusion.for-parents", title: "Для родителей", path: ["Инклюзия в школе"], groups: ["child"] },
    { id: "school-inclusion.tech", title: "Технические средства", path: ["Инклюзия в школе"], groups: ["child"] },
    { id: "school-inclusion.rights", title: "Права в образовании", path: ["Инклюзия в школе"], groups: ["child"] },
    { id: "school-inclusion.communication", title: "Общение с одноклассниками", path: ["Инклюзия в школе"], groups: ["child"] },

    // 7. Поддержка семьи (себе+ребенок)
    { id: "family-support", title: "Поддержка семьи", groups: ["self", "child"] },
    { id: "family-support.acceptance", title: "Принятие диагноза", path: ["Поддержка семьи"], groups: ["self", "child"] },
    { id: "family-support.father-role", title: "Роль отца", path: ["Поддержка семьи"], groups: ["self", "child"] },
    { id: "family-support.crisis", title: "Скорая помощь родителям", path: ["Поддержка семьи"], groups: ["self", "child"] },
    { id: "family-support.tactless", title: "Бестактные вопросы", path: ["Поддержка семьи"], groups: ["self", "child"] },
    { id: "family-support.groups", title: "Группы поддержки", path: ["Поддержка семьи"], groups: ["self", "child"] },

    // 8. Права и льготы (себе+ребенок)
    { id: "rights", title: "Права и льготы", groups: ["self", "child"] },
    { id: "rights.mse", title: "МСЭ и инвалидность", path: ["Права и льготы"], groups: ["self", "child"] },
    { id: "rights.tsr", title: "Технические средства", path: ["Права и льготы"], groups: ["self", "child"] },
    { id: "rights.compensation", title: "Компенсации", path: ["Права и льготы"], groups: ["self", "child"] },
    { id: "rights.mse-criteria", title: "Классификации МСЭ", path: ["Права и льготы"], groups: ["self", "child"] },
    { id: "rights.education", title: "Образовательные льготы", path: ["Права и льготы"], groups: ["self", "child"] },

    // 9. Профориентация и работа (себе+ребенок)
    { id: "career", title: "Профориентация и работа", groups: ["self", "child"] },
    { id: "career.start", title: "Старт в профессию", path: ["Профориентация и работа"], groups: ["self", "child"] },
    { id: "career.options", title: "Доступные профессии", path: ["Профориентация и работа"], groups: ["self", "child"] },
    { id: "career.job-search", title: "Поиск работы", path: ["Профориентация и работа"], groups: ["self", "child"] },
    { id: "career.rights", title: "Права на рабочем месте", path: ["Профориентация и работа"], groups: ["self", "child"] },

    // 10. Истории и лонгриды (себе+ребенок)
    { id: "stories", title: "Истории и лонгриды", groups: ["self", "child"] },
    { id: "stories.series", title: "«[Глухие] и звонкие»", path: ["Истории и лонгриды"], groups: ["self", "child"] },
    { id: "stories.families", title: "Истории семей", path: ["Истории и лонгриды"], groups: ["self", "child"] },
    { id: "stories.experts", title: "Интервью экспертов", path: ["Истории и лонгриды"], groups: ["self", "child"] },
    { id: "stories.comics", title: "Комикс «Команда С.Л.У.Х.»", path: ["Истории и лонгриды"], groups: ["self", "child"] },

    // 11. Подкаст «Не понаслышке» (себе+ребенок)
    { id: "podcast", title: "Подкаст «Не понаслышке»", groups: ["self", "child"] },
    { id: "podcast.all", title: "Все выпуски", path: ["Подкаст «Не понаслышке»"], groups: ["self", "child"] },
    { id: "podcast.audiograms", title: "Аудиограммы", path: ["Подкаст «Не понаслышке»"], groups: ["self", "child"] },
    { id: "podcast.music", title: "Влияние музыки на слух", path: ["Подкаст «Не понаслышке»"], groups: ["self", "child"] },
    { id: "podcast.motivation", title: "Потеря слуха не навсегда", path: ["Подкаст «Не понаслышке»"], groups: ["self", "child"] },

    // 12. Профилактика и здоровье (себе)
    { id: "prevention", title: "Профилактика и здоровье", groups: ["self"] },
    { id: "prevention.tips", title: "10 советов сохранения слуха", path: ["Профилактика и здоровье"], groups: ["self"] },
    { id: "prevention.headphones", title: "Наушники и громкость", path: ["Профилактика и здоровье"], groups: ["self"] },
    { id: "prevention.noise", title: "Шум и профессии", path: ["Профилактика и здоровье"], groups: ["self"] },
    { id: "prevention.presbycusis", title: "Возрастные изменения", path: ["Профилактика и здоровье"], groups: ["self"] },

    // 13. Доступность для бизнеса (себе)
    { id: "business-accessibility", title: "Доступность для бизнеса", groups: ["self"] },
    { id: "business-accessibility.standards", title: "Стандарты доступности", path: ["Доступность для бизнеса"], groups: ["self"] },
    { id: "business-accessibility.training", title: "Обучение персонала", path: ["Доступность для бизнеса"], groups: ["self"] },
    { id: "business-accessibility.content", title: "Доступный контент", path: ["Доступность для бизнеса"], groups: ["self"] },
    { id: "business-accessibility.jobs", title: "Трудоустройство", path: ["Доступность для бизнеса"], groups: ["self"] },

    // 14. Помощь проекту (себе+ребенок)
    { id: "help", title: "Помощь проекту", groups: ["self", "child"] },
    { id: "help.how", title: "Как помочь", path: ["Помощь проекту"], groups: ["self", "child"] },
    { id: "help.volunteering", title: "Волонтерство", path: ["Помощь проекту"], groups: ["self", "child"] },
    { id: "help.partnership", title: "Партнерство", path: ["Помощь проекту"], groups: ["self", "child"] },
    { id: "help.donations", title: "Пожертвования", path: ["Помощь проекту"], groups: ["self", "child"] },
];

export const MaterialCreatePage = () => {
    const navigate = useNavigate();

    const handleCreate = async (payload: any, categoryIds: string[]) => {
        const { id } = await createContent(payload);
        if (categoryIds.length) {
            await linkContentCategories(id, categoryIds);
        }
        navigate(`/materials/${id}`);
        return { id };
    };

    return (
        <Page>
            <Sidebar />
            <PageContent>
                <MaterialCreateForm
                    categories={categories}
                    isLoading={false}
                    errors={undefined}
                    onSubmit={handleCreate}
                />
            </PageContent>
        </Page>
    );
};