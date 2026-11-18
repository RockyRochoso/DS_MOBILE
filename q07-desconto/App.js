import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function moeda(v) {
  const [inteiro, dec] = v.toFixed(2).split('.');
  return 'R$ ' + inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + dec;
}

export default function App() {
  const [produto, setProduto] = useState('');
  const [preco, setPreco] = useState('');
  const [percentual, setPercentual] = useState('');
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState(null);

  function aplicar() {
    Keyboard.dismiss();
    setResultado(null);

    if (produto.trim() === '') {
      setErro('Informe o nome do produto.');
      return;
    }
    const p = preco.trim().replace(',', '.');
    const d = percentual.trim().replace(',', '.');
    if (p === '' || d === '') {
      setErro('Preencha o preço e o percentual de desconto.');
      return;
    }
    const precoNum = Number(p);
    const descNum = Number(d);
    if (isNaN(precoNum) || isNaN(descNum)) {
      setErro('Preço e desconto devem ser numéricos.');
      return;
    }
    if (precoNum < 0) {
      setErro('O preço não pode ser negativo.');
      return;
    }
    if (descNum < 0 || descNum > 100) {
      setErro('O desconto deve estar entre 0% e 100%.');
      return;
    }

    const economia = precoNum * (descNum / 100);
    setErro('');
    setResultado({
      produto: produto.trim(),
      original: precoNum,
      desconto: descNum,
      economia,
      final: precoNum - economia,
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      <StatusBar style="dark" />
      <Text style={styles.titulo}>🏷️ Calculadora de Desconto</Text>

      <Text style={styles.label}>Nome do produto</Text>
      <TextInput style={styles.input} placeholder="Ex.: Fone de ouvido" value={produto} onChangeText={setProduto} returnKeyType="next" />

      <Text style={styles.label}>Preço original (R$)</Text>
      <TextInput style={styles.input} placeholder="Ex.: 200,00" keyboardType="numeric" value={preco} onChangeText={setPreco} returnKeyType="next" />

      <Text style={styles.label}>Desconto (%)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 15"
        keyboardType="numeric"
        value={percentual}
        onChangeText={setPercentual}
        returnKeyType="done"
        onSubmitEditing={aplicar}
      />

      <Pressable style={styles.botao} onPress={aplicar}>
        <Text style={styles.botaoTexto}>Aplicar desconto</Text>
      </Pressable>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      {resultado && (
        <View style={styles.resultado}>
          <Text style={styles.resProduto}>{resultado.produto}</Text>
          <Text style={styles.resLinha}>Preço original: {moeda(resultado.original)}</Text>
          <Text style={styles.resLinha}>Desconto: {resultado.desconto.toString().replace('.', ',')}%</Text>
          <Text style={styles.resEconomia}>Economia: {moeda(resultado.economia)}</Text>
          <Text style={styles.resFinal}>Preço final: {moeda(resultado.final)}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fdf2f0', padding: 24, paddingTop: 70, flexGrow: 1 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#922b21', textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 4, marginTop: 12, color: '#333' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e6b0aa', borderRadius: 8, padding: 12, fontSize: 17 },
  botao: { backgroundColor: '#c0392b', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 22 },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  erro: { color: '#c0392b', marginTop: 14, fontSize: 16, textAlign: 'center' },
  resultado: { marginTop: 24, backgroundColor: '#fadbd8', padding: 20, borderRadius: 10 },
  resProduto: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#922b21' },
  resLinha: { fontSize: 16, marginBottom: 4 },
  resEconomia: { fontSize: 18, fontWeight: '600', color: '#1e8449', marginTop: 6 },
  resFinal: { fontSize: 24, fontWeight: 'bold', color: '#922b21', marginTop: 8 },
});
