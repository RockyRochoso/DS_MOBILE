import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [nome, setNome] = useState('');
  const [n1, setN1] = useState('');
  const [n2, setN2] = useState('');
  const [n3, setN3] = useState('');
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState(null);

  function calcular() {
    setResultado(null);

    if (nome.trim() === '') {
      setErro('Informe o nome do estudante.');
      return;
    }

    const notas = [n1, n2, n3].map((n) => n.trim().replace(',', '.'));
    if (notas.some((n) => n === '')) {
      setErro('Preencha as três notas.');
      return;
    }

    const valores = notas.map(Number);
    if (valores.some((v) => isNaN(v))) {
      setErro('As notas devem ser numéricas.');
      return;
    }
    if (valores.some((v) => v < 0 || v > 10)) {
      setErro('As notas devem estar entre 0 e 10.');
      return;
    }

    const media = (valores[0] + valores[1] + valores[2]) / 3;
    setErro('');
    setResultado({
      nome: nome.trim(),
      media,
      aprovado: media >= 7,
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <StatusBar style="dark" />
      <Text style={styles.titulo}>🎓 Média do Estudante</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} placeholder="Nome do estudante" value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Nota 1</Text>
      <TextInput style={styles.input} placeholder="0 a 10" keyboardType="numeric" value={n1} onChangeText={setN1} />

      <Text style={styles.label}>Nota 2</Text>
      <TextInput style={styles.input} placeholder="0 a 10" keyboardType="numeric" value={n2} onChangeText={setN2} />

      <Text style={styles.label}>Nota 3</Text>
      <TextInput style={styles.input} placeholder="0 a 10" keyboardType="numeric" value={n3} onChangeText={setN3} />

      <Pressable style={styles.botao} onPress={calcular}>
        <Text style={styles.botaoTexto}>Calcular média</Text>
      </Pressable>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      {resultado && (
        <View style={[styles.resultado, { backgroundColor: resultado.aprovado ? '#d4efdf' : '#f5b7b1' }]}>
          <Text style={styles.resNome}>{resultado.nome}</Text>
          <Text style={styles.resMedia}>Média: {resultado.media.toFixed(2).replace('.', ',')}</Text>
          <Text style={styles.resSituacao}>{resultado.aprovado ? 'Aprovado ✅' : 'Reprovado ❌'}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f4f1fa', padding: 24, paddingTop: 70, flexGrow: 1 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#4a235a', textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 4, marginTop: 10, color: '#333' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cdb4db',
    borderRadius: 8,
    padding: 12,
    fontSize: 17,
  },
  botao: { backgroundColor: '#6c3483', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 22 },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  erro: { color: '#c0392b', marginTop: 14, fontSize: 16, textAlign: 'center' },
  resultado: { marginTop: 24, padding: 20, borderRadius: 10, alignItems: 'center' },
  resNome: { fontSize: 20, fontWeight: 'bold' },
  resMedia: { fontSize: 24, marginTop: 6 },
  resSituacao: { fontSize: 22, fontWeight: 'bold', marginTop: 6 },
});
