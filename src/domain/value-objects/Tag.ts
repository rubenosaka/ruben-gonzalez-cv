export class Tag {
  private constructor(private readonly _value: string) {}

  static create(value: string): Tag {
    if (!value || value.trim().length === 0) {
      throw new Error('Tag cannot be empty')
    }

    const normalizedValue = value.trim().toLowerCase()
    
    if (normalizedValue.length > 50) {
      throw new Error('Tag cannot be longer than 50 characters')
    }

    return new Tag(normalizedValue)
  }

  get value(): string {
    return this._value
  }

  equals(other: Tag): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
