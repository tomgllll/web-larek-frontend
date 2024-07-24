# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание проекта
Web-ларёк - интернет-магазин с товарами для веб-разработчиков. В нем можно посмотреть каталог товаров, добавить их в корзину и сделать заказ.

## Архитектура
Архитектура проекта основывается на паттерне Model-View-Presenter (MVP), разделяющем приложение на три основные части:
- Слой данных (Model) - отвечает за хранение и обработку данных, включая все бизнес-процессы, такие как получение, обновление и удаление данных.
- Слой представления (View) - отвечает за отображение данных и взаимодействие с пользователем, включая обработку нажатий кнопок, заполнение и отправку форм, а также их валидацию.
- Презентер (Presenter) - служит связующим звеном между моделью и представлением. Он обрабатывает события от представления, изменяет модель и обновляет отображение.
Использование паттерна MVP позволяет создавать абстракцию представления через интерфейс с определенным набором свойств и методов, обеспечивая гибкость и тестируемость кода.

### Класс Api
Базовый класс для отправки и получения запросов.
#### Конструктор: 
`constructor(baseUrl: string, options: RequestInit = {})` - принимает базовый url-адрес и опции для настройки запросов
#### Поля:
- `baseUrl: string` - базовый дрес сервера
- `options: RequestInit` - опциональный объект с заголовками запросов
#### Методы:
- `handleResponse` - обрабатывает ответ от сервера и возвращает json-ответ либо сообщение об ошибке.
- `get` - выполняет get-запрос на эндпоинт, переданныйв параметре, и возвращает промис с объектом, которым ответил сервер
- `post` - принимает эндпоинт, объект с данными, опционально - метод запроса (по умолчанию post). данные передаются в json и отправляются на эндпоинт.

### Класс Component
Абстрактный базовый класс, предназначенный для отрисовки компонентов пользовательского интерфейса.
#### Конструктор: 
`protected constructor(protected readonly container: HTMLElement)` - принимает DOM-элеммент, в который будет помещен компонент
#### Методы:
- `toggleClass` - переключение класса
- `setText` - установка текстового содержимого для элемента
- `setImage` - установка изображения и, опционально, его альтернативного текста для элемента
- `setDisabled` - смена статуса блокировки для элемента
- `render` - обновление свойства класса, возвращает корневой элемент

### Класс EventEmitter
Брокер событий, классическая реализация. Связывает слой данных и представления. Позволяет подписываться на все события и отправлять их.
#### Поля:
- `_events: Map<EventName, Set<Subscriber>>;` - хранит подписчиков на события: имя события и набор подпсчиков.
#### Конструктор: 
`constructor() { this._events = new Map<EventName, Set<Subscriber>>();}` - инициализирует объект, создавая пустую структуру даннях для хранения событий
#### Методы:
- `on` - установка обработчика на событие
- `off` - снятие обработчика с события
- `emit` - инициализация события с данными
- `onAll` - установка слушателя на все события
-  `ofAll` - сброс всех обработчиков с события
-  `trigger` - создание коллбэк-триггера, генерирующего событие при вызове

### Класс Form
Реализует общий компонент формы, предназначен для управления взаимодействием с формой
#### Конструктор: 
`constructor(protected container: HTMLFormElement, protected events: IEvents)` - принимает HTML-элемент формы, с котоорым будет работать класс, и объект для управления событиями. Инициализирует базовый класс с переданным контейнером формы, находит кнопку отправки формы и элемент для отображения ошибок, добавляет обработчик событий на ввод данных в форме и отправку формы.
#### Методы:
- `onInputChange` - изменение данных
- `resetForm` - сброс значения всех полей формы
#### Сеттеры:
- `valid` - установка состояния кнопки
- `error` - установка сообщения об ошибке

### Класс Modal
Реализует модальные окна, предоставляет методы для открытия, закрытия и управления содержимым модального окна.
#### Конструктор: 
`constructor(container: HTMLElement, protected events: IEvents)` - принимает HTML-элемент контейнер модальнго окна и объект для управления собтытиями. Инициализирует базовый класс с переданным контейнером, находит кнопку закрытия и элемент для отображения содержимого, добавляет обработчики событий для закрытия модального окна
#### Сеттер:
- `content` - установка содержимого модального окна
#### Методы:
- `open` - открытие модального окна
- `close` - закрытие модального окна и очистка его содержимого
- `render` - рендерит данные в модальные окно и открывает его
- `toggleModal` -  управляет видимостью модального окна путем добавления или удаления класса активности
- `handleEscape` - обрабатывает нажатие клавиши Escape для закрытия модального окна


### Класс AppState 
Обеспечивает хранение данных и работу с ними.
#### Поля:
- `catalog` - массив товаров
- `basket` - массив товаров, добавленных в корзину
- `order` - объект с информицией о текущем заказе
  ##### Поля:
  - `payment` - выбранный способ оплаты
  - `address` - адрес доставки
  - `email` - электронная почта покупателя
  - `phone` - номер телефона покупателя
- `orderErrors` - объект с ошибкой, связанной с формой заказа
#### Конструктор: 
`constructor(data: Partial<IAppInfo>, protected events: IEvents)` - принимает начальныее данные для инициализации состояния и объект для управления событиями
#### Методы:
- `setProductList` - установка списка товаров 
- `addToBasket` - добавление товара в корзину
- `deleteFromBasket` - удаление товара из корзины
- `isInBasket` - проерка наличия товара в корзине
- `getBasketId` - получение списка идентификаторов товаров в корзиине
- `getNumberBasket` - получение количества товаров в корзине
- `getTotalBasket` - получение общей стоимости товаров в корзине
- `cleanBasket` - очистка корзины
- `setField` - установка значения в поля информации о заказе, вызов проверки на ошибки
- `setOrderErrors` - установка ошибки для полей адреса и оплаты
- `setContacsErrors` - установка ошибки для полей телефона и электронной почты
- `emitChanges` - приватный метод оповещения об изменениях состояния через события

### Класс Basket
Управление корзиной
#### Поля:
- `listElement` - HTML-элемент, представляющий список товаров в корзине
- `orderButton` - HTML-элемент кнопки оформления заказа
- `totalElement` - HTML-элемент, отображающий общую стоимость товаров в корзине
#### Конструктор: 
`constructor(container: HTMLFormElement, protected events: IEvents)` - принимает HTML-элемент форы, представляющей контейнер корзины, и объект для управления событиями.
#### Геттеры:
- `list` - возвращает массив элементов списка товаров в корзине
- `total` - возвращает общую стоимость товаров в корзине в виде числа
#### Сеттеры:
- `list` - устанавливает элементы списка товаров в корзине. Если список не пуст, элементы заменяютмся новыми и кнопка оформления заказа активируется, иначе - отображается соответствующее сообщение и кнопка деактивируется.
- `total` - устанавливает общую стоимость товаров в корзине

###  Класс OrderForm
Специализированная реализация формы для оформления заказа, наследуется от базового класса Form<IOrder>.
#### Поля:
- `paymentButtonElements` - массив кнопок способов оплаты
- `addressElement` - HTML-элемент поля ввода адреса доставки
#### Конструктор: 
`constructor(container: HTMLFormElement, events: IEvents)` - принимает HTML-элемент формы и объект для управления мобытиями. Инициализирует базовый класс с переданным контейнером и объектом событий, находит и инициализирует кнопки выбора способа оплаты, добавляет для них обработчики событий
#### Сеттеры:
- `address` - установка значения поля ввода адреса доставки
- `paymentButton` - установка класса активности выбранной кнопке способа оплата

### Класс Page
Компонент страницы, который управляет элементами интерфейса. Наследуется от базового класса Component<IPage>.
#### Поля:
- `counterElement` - HTML-элемент счетчика товаров в корзине
- `catalogElement` - HTML-элемент каталога товаров
- `basketElement` - HTML-элемент кнопки корзины, открывающей ее
- `wrapperElement` - HTML-элемент контейнер страницы
#### Конструктор: 
`constructor(container: HTMLElement, protected events: IEvents)` - принимает контейнер страницы и объект для управления событиями
#### Сеттеры:
- `catalog` - установка элементов каталога на странице
- `counter` - установка знчения счетчика товаров в корзине
- `locked` - установка состояния заблокированности страницы

### Класс Product
Компонент, отвечающий за отображение и управление элементом товара на странице. Наследуется от базового класса Component<IProduct>.
#### Поля:
- `indexElement` - HTML-элемент индекса товара (позиция в списке)
- `descriptionElement` - HTML-элемент описания товара
- `imageElement` - HTML-элемент изображния товара
- `titleElement` - HTML-элемент заголовка товара
- `categoryElement` - HTML-элемент категории товара
- `priceElement` - HTML-элемент цены товара
- `buttonElement` - HTML-элемент кнопки добавления товара в корзину
#### Конструктор: 
`constructor(protected blockName: string, container: HTMLElement, actions?: IProductActions)` - принимает строку имя блока, используемого для формирования CSS-классов, HTML-элемент контейнера товара и, опционально, объект, содержащий действия для взаимодействия с товаром
#### Методы и свойства:
- геттер и сеттер `id` - устанавливает/возвращает знаачение атрибута id контейнера
- сеттер `description` - усоанавливает текстовое содержимое описания товара
- сеттер `image` - устанавливает источник изображения и альтернативный текст
- геттер и сеттер `title` - устанавливает/возвращает заголовок товара
- сеттер `category` - устанавливает класс категории и текстовое содержимое элемента категории
- сеттер `price` - устанавливает цену продукта/выводит соответствующее сообщение если она не указана
- сеттер `inBasket` - устанавливает текст кнопки в зависимости от того6 находится ли продукт в корзине
- сеттер `index` - устанавливает текст идекса

### Класс SiteApi
#### Поля: 
- `cdn` - url-адрес CDN
#### Конструктор: 
`constructor(cdn: string, baseUrl: string, options: RequestInit = {})` - принимает url-адрес cdn для изображений товаров, базовый url-адрес api и опции для настройки запросов
#### Методы:
- `getProductList` - отправляет get-запрос на эндпоинт /product для получения списка товаров, добавляет url-адрес cdn к каждому изображению товара и возвращает массив объектов IProduct
- `postOrder` - отправляет post-запрос на эндпоинт /order с данными заказа, возвращает объект ISuccessfulOrder

 ### Класс SuccessfulForm
 #### Поля: 
 - `closeButtonElement` - HTML-элемент кнопки закрытия формы
 - `descriptionElement` - HTML-элемент описания успешного завершения заказа
#### Конструктор: 
constructor(container: HTMLElement, events: IEvents) - принимает элемент контейнера успешной форы заказа и объеет для управления событиями
#### Методы:
- сеттер `total` - устанавливает текстовое содержимое элеента описания завершения заказа, отображая количество списанных синапсов

## Взаимодействие компонентов
Осуществляется за счет брокера событий, который их ослежиает.
### Список событий:
#### События заказа:
- `order:open` - открытие страницы заказа
- `order:close` - закрытие страницы заказа
- `order:submit` - отправка заказа
- `order:success` - успешное завершение заказа
- `order:failure` - неудача при отправке заказа
#### События корзины:
- `basket:open` - открытие корзины
- `basket:close` - закрытие корзины
- `basket:add` - добавление товара в корзину
- `basket:remove` - удаление товара из корзины
- `basket:changed` - изменениe содержимого корзины
#### События товара:
- `product:add` - добавление продукта
- `product:remove` - удаление продукта
- `product:update` - обновление информации о товаре
- `product:click` - клик по товару
- `product:select` - выбор товара
- `product:listChange` - изменение списка товаров

## Интерфейсы и типы
### IAppInfo
Общие данные о магазине
#### Поля:
- `catalog` - каталог товаров
- `basket` - корзина
- `order` - информация о заказе
- `formError` - ошибки формы
- `events` - события

### IFormInfo
Данные формы
#### Поля:
- `valid` - валидация формы
- `errors` - ошибки формы
- `addrress` - адрес покупателя
- `payment` - способ оплаты
- `phone` - номер телефона покупателя
- `email` - электронная почта покупателя

### IOrder
Форма ввода информации о способе оплаты и адресе
#### Поля:
- `payment` - способ оплаты
- `address` - адрес покупателя

### IBasketInfo
Данные корзины
#### Поля:
- `list` - список товаров в корзине
- `total` - общая сумма заказа

### ISuccessfulFormInfo
Окно успешного заказа
#### Поля:
- `total` - общая сумма заказа

### IPage
Компонент управления элементами интерфейса
#### Поля:
- `counter` - счетчик
- `catalog` - каталог товаров

### IProductActions
Обработка действий с товаром
#### Поля:
- `onClick` - действие при клике на товар

###  IModalInfo
Данные модального окна
#### Поля:
- `content` - содержимое модального окна

### IShoppingInfo
Общие данные для заказа
`type IShoppingInfo = IOrder & IBuyerInfo;`

### ISuccessfulOrder
Ответ сервера при создании заказа
#### Поля:
- `id` - идентификатор заказа
- `total` - общая сумма заказа

### IFormError
Вывод текста ошибок
```
type IFormError = Partial<IShoppingInfo>;
// Partial<IShoppingInfo> - Ошибки формы
```

### IBuyerInfo
Форма ввода контактных данных пользователя
#### Поля:
- `email` - электронная почта пользователя
- `phone` - номер телефона пользователя

### IShoppingPost
Данные для отправки запроса на создание заказа
#### Поля:
- `total` - общая сумма заказа
- `items` - список товаров

### IProduct
Карточка товара
#### Поля:
- `id` - идентификатор товара
- `description` - описание товара
- `image` - изображение товара
- `title` - название товара
- `category` - категория товара
- `price` - цена товара
- `index` - индекс товара (опционально)
