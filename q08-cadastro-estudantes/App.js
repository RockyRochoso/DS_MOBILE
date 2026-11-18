import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [estudantes, setEstudantes] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(true);

  function aviso(texto, ok) {
    setMensagem(texto);
    setSucesso(ok);
  }

  function cadastrar() {
    if (!nome.trim() || !matricula.trim() || !email.trim() || !curso.trim()) {
      return aviso('Preencha todos os campos obrigatórios.', false);
    }
    if (!email.includes('@') || !email.includes('.')) {
      return aviso('Informe um e-mail válido.', false);
    }
    if (estudantes.some((e) => e.matricula === matricula.trim())) {
      return aviso('Já existe um estudante com esta matrícula.', false);
    }

    const novo = {
      nome: nome.trim(),
      matricula: matricula.trim(),
      email: email.trim(),
      curso: curso.trim(),
    };

    setEstudantes([...estudantes, novo]);
    setNome('');
    setMatricula('');
    setEmail('');
    setCurso('');
    aviso('Estudante cadastrado com sucesso!', true);
  }

  function remover(mat) {
    setEstudantes(estudantes.filter((e) => e.matricula !== mat));
    aviso('Estudante removido.', true);
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <StatusBar style="dark" />
      <Text style={styles.titulo}>🎓 Cadastro de Estudantes</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} placeholder="Maria Silva" value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Matrícula</Text>
      <TextInput style={styles.input} placeholder="20260001" keyboardType="numeric" value={matricula} onChangeText={setMatricula} />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="maria@exemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Curso</Text>
      <TextInput style={styles.input} placeholder="Licenciatura em Computação" value={curso} onChangeText={setCurso} />

      <Pressable style={styles.botao} onPress={cadastrar}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </Pressable>

      {mensagem !== '' && (
        <Text style={[styles.mensagem, { color: sucesso ? '#1e8449' : '#c0392b' }]}>{mensagem}</Text>
      )}

      <Text style={styles.subtitulo}>Estudantes cadastrados ({estudantes.length})</Text>

      {estudantes.length === 0 && <Text style={styles.vazio}>Nenhum estudante cadastrado.</Text>}

      {estudantes.map((e) => (
        <View key={e.matricula} style={styles.card}>
          <Text style={styles.cardNome}>{e.nome}</Text>
          <Text style={styles.cardInfo}>Matrícula: {e.matricula}</Text>
          <Text style={styles.cardInfo}>E-mail: {e.email}</Text>
          <Text style={styles.cardInfo}>Curso: {e.curso}</Text>
          <Pressable style={styles.botaoRemover} onPress={() => remover(e.matricula)}>
            <Text style={styles.botaoTexto}>Remover</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#eef5ee', padding: 24, paddingTop: 70, flexGrow: 1 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#1d6b3a', textAlign: 'center', marginBottom: 16 },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 4, marginTop: 10, color: '#333' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#b5d3bd', borderRadius: 8, padding: 11, fontSize: 16 },
  botao: { backgroundColor: '#1d8348', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  mensagem: { marginTop: 12, fontSize: 15, textAlign: 'center', fontWeight: '600' },
  subtitulo: { fontSize: 20, fontWeight: 'bold', marginTop: 28, marginBottom: 10, color: '#1d6b3a' },
  vazio: { color: '#777', fontStyle: 'italic' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#cfe3d4' },
  cardNome: { fontSize: 18, fontWeight: 'bold', color: '#1d6b3a', marginBottom: 6 },
  cardInfo: { fontSize: 15, color: '#333', marginBottom: 2 },
  botaoRemover: { backgroundColor: '#b03a2e', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 10 },
});
