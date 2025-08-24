export class Summary {
  private constructor(private readonly _value: string | null) {}

  static create(value: string | null | undefined): Summary {
    if (!value) {
      return new Summary(null)
    }

    const normalizedValue = value.trim()

    if (normalizedValue.length > 500) {
      throw new Error('Summary cannot be longer than 500 characters')
    }

    return new Summary(normalizedValue)
  }

  get value(): string | null {
    return this._value
  }

  hasValue(): boolean {
    return this._value !== null
  }

  equals(other: Summary): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value || ''
  }
}
