/*jshint esversion: 6 */

const token = "5867d688-4e58-4ab4-bcdb-1396e024d430";
const $formContact = document.querySelector("#contact-form");

const sendForm = event => {
  event.preventDefault();
  const message = {
    name: document.querySelector("#cname").value,
    email: document.querySelector("#cemail").value,
    text: document.querySelector("#cmessage").value
  };
  smtpJS(message);
};
const smtpJS = message => {
  try {
    Email.send(
      "raonicaselli@gmail.com",
      "raonicaselli@gmail.com",
      "Nova mensagem de Cas UX Design",
      `${message.name}: ${message.email} - ${message.text}`,
      { token,
        callback: alert("Obrigado pela mensagem, em breve entratei em contato.")
      }
    );
  } catch (e) {
    alert("Erro");
  }
};

$formContact.addEventListener("submit", sendForm);
