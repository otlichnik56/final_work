//const host = "";
const loginHost = "";
const registerHost = "";

type LoginProps = {
  email: string;
  name: string;
  password: string;
  token: string;
  error: string;
  login: string;
  title: string;
  description: string;
  date: number;
  status: string;
  id: number
};


//  регистрация
export async function registration({ login, name, password }: LoginProps) {
  const response = await fetch(registerHost, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error("Пользователь уже зарегистрирован");
  }
  const data = await response.json();

  return data;
}

// залогониться
export async function loginUser({ login, password }: LoginProps) {
  const response = await fetch(loginHost, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  });

  if (response.status === 400) {
    throw new Error("Не верный логин или пароль!");
  }

  if (response.status === 500) {
    throw new Error("Ошибка сервера");
  }

  const data = await response.json();
  return data;
}
