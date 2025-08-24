export class Slug {
  private constructor(private readonly _value: string) {}

  static create(value: string): Slug {
    if (!value || value.trim().length === 0) {
      throw new Error('Slug cannot be empty')
    }

    const normalizedValue = value.trim().toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    if (normalizedValue.length === 0) {
      throw new Error('Slug must contain valid characters')
    }

    if (normalizedValue.length > 100) {
      throw new Error('Slug cannot be longer than 100 characters')
    }

    return new Slug(normalizedValue)
  }

  get value(): string {
    return this._value
  }

  equals(other: Slug): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }
}
