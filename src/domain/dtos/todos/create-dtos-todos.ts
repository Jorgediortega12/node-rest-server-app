export class CreateDtosTodos {
  constructor(public readonly text: string) {}

  static create(props: { [key: string]: any }): [string?, CreateDtosTodos?] {
    const { text } = props;

    // Validación: Asegúrate de que `text` exista y sea una cadena no vacía
    if (!text || typeof text !== "string" || text.trim() === "") {
      return ["Text property is required", undefined];
    }

    // Si pasa la validación, crea y retorna el DTO
    return [undefined, new CreateDtosTodos(text.trim())];
  }
}
