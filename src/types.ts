export type courseType = {
  _id: string; // Уникальный идентификатор курса
  description: string; // Описание курса
  directions: string[]; // Направления, к которым относится курс
  fitting: string[]; // Показания, для кого подходит курс
  nameEN: string ; // Название курса на английском
  nameRU: string; // Название курса на русском
  order: number; // Порядок отображения курса
  workouts: string[]; // Список идентификаторов тренировок, связанных с курсом
}
