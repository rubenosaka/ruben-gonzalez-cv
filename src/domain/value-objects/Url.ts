export class Url {
  private constructor(private readonly _value: string) {}

  static create(value: string): Url {
    if (!value || value.trim().length === 0) {
      throw new Error('URL cannot be empty')
    }

    const normalizedValue = value.trim()
    
    if (!normalizedValue.startsWith('/')) {
      throw new Error('URL must start with /')
    }

    return new Url(normalizedValue)
  }

  get value(): string {
    return this._value
  }

  equals(other: Url): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }

  isHomePage(): boolean {
    return this._value === '/'
  }

  isPostPage(): boolean {
    return this._value.startsWith('/posts/')
  }

  isPagePage(): boolean {
    return !this.isHomePage() && !this.isPostPage()
  }
}
