const loginUrl = "";
const registerUrl = "";
const tokenUrl = "";

type LoginProps = {
  email: string;
  password: string;
};

type RegisterProps = {
  email: string;
  password: string;
  username: string;
};

export async function login({ email, password }: LoginProps) {
  const response = await fetch(loginUrl, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok && response.status === 401) {
    throw new Error("Не найдено активной учётной записи с указанными данными");
  } else if (!response.ok && response.status === 400) {
    throw new Error("Запрос составлен некорректно");
  } else if (!response.ok && response.status === 412) {
    throw new Error("Данные в неверном формате");
  } else if (!response.ok && response.status === 500) {
    throw new Error("Ошибка соединения");
  }

  const data = await response.json();
  return data;
}

export async function register({ email, password, username }: RegisterProps) {
  const response = await fetch(registerUrl, {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok && response.status === 403) {
    throw new Error("Введенный email уже занят");
  } else if (!response.ok && response.status === 500) {
    throw new Error("Ошибка соединения");
  }

  const data = await response.json();
  return data;
}

export async function fetchToken({ email, password }: LoginProps) {
  const response = await fetch(tokenUrl, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
}
