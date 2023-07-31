// Функция-генератор для уникальных идентификаторов
class UIDGenerator {
  private counter: number;

  constructor() {
    this.counter = 0;
  }

  private generateTimestamp(): string {
    return Date.now().toString(36);
  }

  private generateRandomString(): string {
    return Math.random().toString(36).substr(2, 5);
  }

  public generateUID(): string {
    const timestamp = this.generateTimestamp();
    const random = this.generateRandomString();
    const uid = `${timestamp}${random}${this.counter.toString(36)}`;
    this.counter++;
    return uid;
  }
}

// Пример использования класса для генерации уникальных идентификаторов
export const uidGenerator = new UIDGenerator();
// const generator = uidGenerator();
// export const generateUid = function(): string{
//     const uid = generator.next().value;
//     return uid
// } 

  