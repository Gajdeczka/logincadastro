import { Dispatch, FormEventHandler, SetStateAction } from "react";

export default function ({setRoute}: {setRoute: Dispatch<SetStateAction<string>>}) {
  const enviarDados: FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault()
    const { email, password } = ev.currentTarget

    const request = await fetch(`http://localhost:8081/api/login/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const responseData = await request.json()

    if (request.status >= 200 && request.status <= 299) {
      localStorage.setItem("token", responseData.token)
      alert("PARABAEINZ!")
      setRoute("teste")
      return
    }

    if (responseData.error) {
      alert(responseData.error)
      return
    }

    alert("Cara! deu um erro tão foda, que eu nem sei o que foi!")
  }
  
  
  return <>
    <div className="form-container">
      <form onSubmit={enviarDados}>
        <h1>Login</h1>
        <input name="email" placeholder="Email" />
        <input name="password" placeholder="Password" />
        <button onClick={() => {}}>Entrar</button>
        <button onClick={() => setRoute("cadastro")}>Cadastrar-se</button>
        <button onClick={() => setRoute("teste")}>Ir para teste</button>
      </form>
    </div>
  </>
}