import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [sentido, setSentido] = useState('CtoF'); // 'CtoF' ou 'FtoC'
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');
  const [erro, setErro] = useState('');

  function converter() {
    setResultado('');
    const texto = valor.trim().replace(',', '.');
    if (texto === '') {
      setErro('Informe a temperatura.');
      return;
    }
    const n = Number(texto);
    if (isNaN(n)) {
      setErro('Digite apenas números.');
      return;
    }
    setErro('');

    if (sentido === 'CtoF') {
      const f = (n * 9) / 5 + 32;
      setResultado(`${n} °C = ${f.toFixed(1).replace('.', ',')} °F`);
    } else {
      const c = ((n - 32) * 5) / 9;
      setResultado(`${n} °F = ${c.toFixed(1).replace('.', ',')} °C`);
    }
  }

  function trocar(novo) {
    setSentido(novo);
    setResultado('');
    setErro('');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.titulo}>🌡️ Conversor de Temperatura</Text>

      <View style={styles.linha}>
        <Pressable
          style={[styles.opcao, sentido === 'CtoF' && styles.opcaoAtiva]}
          onPress={() => trocar('CtoF')}
        >
          <Text style={[styles.opcaoTexto, sentido === 'CtoF' && styles.opcaoTextoAtivo]}>°C → °F</Text>
        </Pressable>
        <Pressable
          style={[styles.opcao, sentido === 'FtoC' && styles.opcaoAtiva]}
          onPress={() => trocar('FtoC')}
        >
          <Text style={[styles.opcaoTexto, sentido === 'FtoC' && styles.opcaoTextoAtivo]}>°F → °C</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Temperatura em {sentido === 'CtoF' ? '°C' : '°F'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 30"
        keyboardType="numbers-and-punctuation"
        value={valor}
        onChangeText={setValor}
      />

      <Pressable style={styles.botao} onPress={converter}>
        <Text style={styles.botaoTexto}>Converter</Text>
      </Pressable>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
      {resultado !== '' && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTexto}>{resultado}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff8ee', padding: 24, paddingTop: 70 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#a04000', textAlign: 'center', marginBottom: 24 },
  linha: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  opcao: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 2, borderColor: '#e59866', alignItems: 'center' },
  opcaoAtiva: { backgroundColor: '#e59866' },
  opcaoTexto: { fontSize: 17, fontWeight: 'bold', color: '#a04000' },
  opcaoTextoAtivo: { color: '#fff' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#333' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5c7a8', borderRadius: 8, padding: 12, fontSize: 18 },
  botao: { backgroundColor: '#d35400', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  erro: { color: '#c0392b', marginTop: 14, fontSize: 16, textAlign: 'center' },
  resultado: { marginTop: 24, backgroundColor: '#fae5d3', padding: 20, borderRadius: 10, alignItems: 'center' },
  resultadoTexto: { fontSize: 24, fontWeight: 'bold', color: '#a04000' },
});
