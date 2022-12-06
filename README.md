# todo

## Тестовое задание на позицию junior frontend разработчика.

- [Представление](#представление)
- [Замечания](#замечания)

---

### Представление

**Рис.1 Авторизация темная тема**
![1](./screenshots/1.png)

**Рис.2 Авторизация светлая тема**
![2](./screenshots/2.png)

**Рис.3 Ошибка**
![3](./screenshots/3.png)

**Рис.4 Добавление задачи**
![4](./screenshots/4.png)

**Рис.5 Список выполненных задач**
![5](./screenshots/5.png)

**Рис.6 Список невыполненных в светлой теме**
![6](./screenshots/6.png)

**Рис.7 Удалённые задачи**
![7](./screenshots/7.png)

---

### Замечания

**Несколько пунктов, которые я бы хотел исправить или добавить:**

- **Ошибки**
  - Добавить миддлвары на проверку авторизации (и последующем мутировании запроса данными пользователя user из куков) и мидлвар на отправку ошибок после роутов
  - Заменить заглушку alert для ошибки на ErrorBoundary
  - В общем отрефакторить data-flow ошибок (несколько раз передумывал делать, в итоге получилось не очень)
- **Компоненты**
  - Отрефакторить некоторые "уродливые" компоненты (как в логике, так и в стилях)
  - Добавить HOC для провайдеров
- **Стили**
  - Добавить больше переменных, миксинов (размеры и т.д.)
- **Авторизация**
  - Метод signout не разлогинивает пользователя на стороне сервера. У меня уже готова отдельная ветка, которую я объединю с основной, когда ответят на моё тестовое. Потому что я не уверен, что это сыграет в мою пользу, если я ещё что-то лишнее сделаю :)
  
Эти недочёты я определил на первый взгляд.
