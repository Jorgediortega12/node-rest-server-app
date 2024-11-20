export class UpdateDtsoTodos {
    constructor(
      public readonly id: number,
      public readonly text?: string,
      public readonly completedAt?: Date
    ) {}
  
    get values() {
      const returnObj: { [key: string]: any } = {};
      if (this.text) returnObj.text = this.text;
      if (this.completedAt) returnObj.completedAt = this.completedAt;
  
      return returnObj;
    }
  
    static create(props: { [key: string]: any }): [string?, UpdateDtsoTodos?] {
      const { text, completedAt, id } = props;
  
      // Validación del ID
      if (!id || isNaN(Number(id))) {
        return ["Id must be a valid number"];
      }
  
      // Validación de la fecha
      let parsedCompletedAt: Date | undefined = undefined;
      if (completedAt) {
        parsedCompletedAt = new Date(completedAt);
        if (isNaN(parsedCompletedAt.getTime())) {
          return ["CompletedAt must be a valid Date"];
        }
      }
  
      // Validación del texto (opcional)
      const trimmedText = text?.trim();
  
      return [undefined, new UpdateDtsoTodos(id, trimmedText, parsedCompletedAt)];
    }
  }