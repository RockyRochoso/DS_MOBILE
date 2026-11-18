import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [peso, setPeso] = useState('');
  const [litros, setLitros] = useState(null);
  const [erro, setErro] = useState('');

  function calcular() {
    const texto = peso.trim().replace(',', '.');
    setLitros(null);

    if (texto === '') {
      setErro('Informe o peso em quilogramas.');
      return;
    }
    const valor = Number(texto);
    if (isNaN(valor)) {
      setErro('Digite apenas números.');
      return;
    }
    if (valor <= 0) {
      setErro('O peso deve ser maior que zero.');
      return;
    }

    setErro('');
    setLitros((valor * 35) / 1000);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.titulo}>💧 Hidratação Diária</Text>
      <Text style={styles.subtitulo}>Estimativa didática: 35 mL por kg</Text>

      <Text style={styles.label}>Peso (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 70"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <Pressable style={styles.botao} onPress={calcular}>
        <Text style={styles.botaoTexto}>Calcular</Text>
      </Pressable>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      {litros !== null && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTexto}>
            {litros.toFixed(2).replace('.', ',')} litros por dia
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef6fb', padding: 24, paddingTop: 70 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#0b5394', textAlign: 'center' },
  subtitulo: { textAlign: 'center', color: '#555', marginBottom: 30, marginTop: 6 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#333' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b6d0e2',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
  },
  botao: {
    backgroundColor: '#0b5394',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  erro: { color: '#c0392b', marginTop: 14, fontSize: 16, textAlign: 'center' },
  resultado: {
    marginTop: 24,
    backgroundColor: '#d9ecf9',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultadoTexto: { fontSize: 24, fontWeight: 'bold', color: '#0b5394' },
});
