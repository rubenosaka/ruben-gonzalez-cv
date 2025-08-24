export class Title {
  private constructor(private readonly _value: string) {}

  static create(value: string): Title {
    if (!value || value.trim().length === 0) {
      throw new Error('Title cannot be empty')
    }

    const normalizedValue = value.trim()

    if (normalizedValue.length > 200) {
      throw new Error('Title cannot be longer than 200 characters')
    }

    return new Title(normalizedValue)
  }

  get value(): string {
    return this._value
  }

  equals(other: Title): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
