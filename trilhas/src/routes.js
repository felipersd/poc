import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

routes.post('/trilhaschat/:id', async (req, res) => {
  const messageLegislação = {
    user: { id: 1, name: 'Felipe Ribeiro'},
    courseID: '0',
    course: 'Legislação de Trânsito',
    msg: 'Fala Galerinha Tudo bom com vocês?',
    grade: 10,
  };

  const messageDirecaoDefensiva = {
    user: { id: 1, name: 'Felipe Ribeiro'},
    courseID: '1',
    course: 'Direção Defensiva',
    msg: 'Fala Galerinha Tudo bom com vocês?',
    grade: 10,
  };

  const messagePrimeirosSocorros = {
    user: { id: 1, name: 'Felipe Ribeiro'},
    courseID: '2',
    course: 'Primeiros Socorros',
    msg: 'Fala Galerinha Tudo bom com vocês?',
    grade: 10,
  };

  const messageMeioAmbiente = {
    user: { id: 1, name: 'Felipe Ribeiro'},
    courseID: '3',
    course: 'Cidadania e Meio Ambiente',
    msg: 'Fala Galerinha Tudo bom com vocês?',
    grade: 10,
  };

  const messageMecanica = {
    user: { id: 1, name: 'Felipe Ribeiro'},
    courseID: '4',
    course: 'Mecânica Básica',
    msg: 'Fala Galerinha Tudo bom com vocês?',
    grade: 10,
  };

  let mensagem

  if(req.params.id == 0){
    mensagem = messageLegislação;
  }

  else if(req.params.id == 1){
    mensagem = messageDirecaoDefensiva;
  }

  else if(req.params.id == 2){
    mensagem = messagePrimeirosSocorros;
  }

  else if(req.params.id == 3){
    mensagem = messageMeioAmbiente;
  }

  else if(req.params.id == 4){
    mensagem = messageMecanica;
  }
  
  // Chamar micro serviço
  await req.producer.send({
    topic: 'trilhas',
    compression: CompressionTypes.GZIP,

    messages: [
      { value: JSON.stringify(mensagem)},
    ],
  })

  return res.json({ ok: true });
});

export default routes;