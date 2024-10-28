export class MissingKeyError extends Error {
  constructor(
    public status: number,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }

  toResponse() {
    return new Response(
      JSON.stringify({ error: this.message, cause: this.cause }),
      {
        status: this.status,
      },
    );
  }
}

export class CreateCardError extends Error {
  constructor(
    public status: number,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }

  toResponse() {
    return new Response(
      JSON.stringify({ error: this.message, cause: this.cause }),
      {
        status: this.status,
      },
    );
  }
}

export class MissingDataError extends Error {
  constructor(
    public status: number,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }

  toResponse() {
    return new Response(
      JSON.stringify({ error: this.message, cause: this.cause }),
      {
        status: this.status,
      },
    );
  }
}

export const DEFAULT_ERROR = new Response(
  JSON.stringify({
    error: "Unexpected error, the developer has been notified.",
  }),
  {
    status: 500,
  },
);
