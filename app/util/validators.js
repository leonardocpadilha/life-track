export function validarNomeCompleto(nome) {
  const regex = /^[a-zA-ZÀ-ÿ]+\s+[a-zA-ZÀ-ÿ]+.*$/;
  return regex.test(nome);
}

export function validarSenhaForte(senha) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
  return regex.test(senha);
}
