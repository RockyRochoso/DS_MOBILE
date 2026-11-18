import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function moeda(v) {
  const [inteiro, dec] = v.toFixed(2).split('.');
  return 'R$ ' + inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + dec;
}

export default function App() {
  const [saldo, setSaldo] = useState(1000);
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(true);

  function lerValor() {
    const texto = valor.trim().replace(',', '.');
    if (texto === '') return { erro: 'Informe um valor.' };
    const n = Number(texto);
    if (isNaN(n)) return { erro: 'Digite apenas números.' };
    if (n <= 0) return { erro: 'O valor deve ser positivo.' };
    return { n };
  }

  function aviso(texto, ok) {
    setMensagem(texto);
    setSucesso(ok);
  }

  function depositar() {
    const r = lerValor();
    if (r.erro) return aviso(r.erro, false);
    setSaldo(saldo + r.n);
    setValor('');
    aviso(`Depósito de ${moeda(r.n)} realizado.`, true);
  }

  function sacar() {
    const r = lerValor();
    if (r.erro) return aviso(r.erro, false);
    if (r.n > saldo) return aviso('Saldo insuficiente para este saque.', false);
    setSaldo(saldo - r.n);
    setValor('');
    aviso(`Saque de ${moeda(r.n)} realizado.`, true);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.titulo}>🏦 Simulador de Conta</Text>
      <Text style={styles.nota}>Simulação: nenhum dinheiro real é movimentado.</Text>

      <View style={styles.saldoBox}>
        <Text style={styles.saldoLabel}>Saldo atual</Text>
        <Text style={styles.saldo}>{moeda(saldo)}</Text>
      </View>

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 200,00"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <View style={styles.linha}>
        <Pressable style={[styles.botao, { backgroundColor: '#1e8449' }]} onPress={depositar}>
          <Text style={styles.botaoTexto}>Depositar</Text>
        </Pressable>
        <Pressable style={[styles.botao, { backgroundColor: '#b03a2e' }]} onPress={sacar}>
          <Text style={styles.botaoTexto}>Sacar</Text>
        </Pressable>
      </View>

      {mensagem !== '' && (
        <Text style={[styles.mensagem, { color: sucesso ? '#1e8449' : '#c0392b' }]}>{mensagem}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef3f0', padding: 24, paddingTop: 70 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#145a32', textAlign: 'center' },
  nota: { textAlign: 'center', color: '#666', marginTop: 6, marginBottom: 24 },
  saldoBox: { backgroundColor: '#d5f5e3', borderRadius: 10, padding: 20, alignItems: 'center', marginBottom: 24 },
  saldoLabel: { fontSize: 16, color: '#145a32' },
  saldo: { fontSize: 34, fontWeight: 'bold', color: '#145a32', marginTop: 4 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#333' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#b2c9bb', borderRadius: 8, padding: 12, fontSize: 18 },
  linha: { flexDirection: 'row', gap: 10, marginTop: 16 },
  botao: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  mensagem: { marginTop: 18, fontSize: 16, textAlign: 'center', fontWeight: '600' },
});
