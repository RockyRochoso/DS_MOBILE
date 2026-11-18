import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const CANDIDATOS_INICIAIS = [
  { id: 1, nome: 'Ana Souza', votos: 0 },
  { id: 2, nome: 'Bruno Lima', votos: 0 },
  { id: 3, nome: 'Carla Mendes', votos: 0 },
];

export default function App() {
  const [candidatos, setCandidatos] = useState(CANDIDATOS_INICIAIS);

  function votar(id) {
    setCandidatos(candidatos.map((c) => (c.id === id ? { ...c, votos: c.votos + 1 } : c)));
  }

  function zerar() {
    setCandidatos(CANDIDATOS_INICIAIS);
  }

  const total = candidatos.reduce((soma, c) => soma + c.votos, 0);
  const maior = Math.max(...candidatos.map((c) => c.votos));
  const lideres = candidatos.filter((c) => c.votos === maior);

  let situacao;
  if (total === 0) {
    situacao = 'Nenhum voto registrado ainda.';
  } else if (lideres.length > 1) {
    situacao = `Empate na liderança entre: ${lideres.map((c) => c.nome).join(' e ')} (${maior} votos cada).`;
  } else {
    situacao = `Mais votado(a): ${lideres[0].nome} com ${maior} voto(s).`;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.titulo}>🗳️ Eleição Estudantil</Text>
      <Text style={styles.nota}>Candidatos fictícios</Text>

      {candidatos.map((c) => (
        <View key={c.id} style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>{c.nome}</Text>
            <Text style={styles.votos}>{c.votos} voto(s)</Text>
          </View>
          <Pressable style={styles.botao} onPress={() => votar(c.id)}>
            <Text style={styles.botaoTexto}>Votar</Text>
          </Pressable>
        </View>
      ))}

      <View style={styles.resumo}>
        <Text style={styles.total}>Total geral: {total} voto(s)</Text>
        <Text style={styles.situacao}>{situacao}</Text>
      </View>

      <Pressable style={[styles.botao, styles.botaoZerar]} onPress={zerar}>
        <Text style={styles.botaoTexto}>Zerar votação</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f3f0fa', padding: 24, paddingTop: 70, flexGrow: 1 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#2e1a6b', textAlign: 'center' },
  nota: { textAlign: 'center', color: '#666', marginBottom: 20, marginTop: 4 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d7cff0',
  },
  nome: { fontSize: 20, fontWeight: 'bold', color: '#2e1a6b' },
  votos: { fontSize: 16, color: '#555', marginTop: 2 },
  botao: { backgroundColor: '#5b3cc4', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 8 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoZerar: { backgroundColor: '#7f8c8d', alignItems: 'center', marginTop: 16 },
  resumo: { backgroundColor: '#e4dcf7', padding: 18, borderRadius: 10, marginTop: 8 },
  total: { fontSize: 18, fontWeight: 'bold', color: '#2e1a6b' },
  situacao: { fontSize: 16, marginTop: 8, color: '#2e1a6b' },
});
