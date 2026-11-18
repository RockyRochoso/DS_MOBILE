import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const PRODUTOS = [
  { id: 1, nome: 'Sanduíche', preco: 8.0 },
  { id: 2, nome: 'Suco', preco: 5.0 },
  { id: 3, nome: 'Salgado', preco: 6.5 },
  { id: 4, nome: 'Refrigerante', preco: 4.5 },
  { id: 5, nome: 'Bolo (fatia)', preco: 7.0 },
];

function moeda(v) {
  const [inteiro, dec] = v.toFixed(2).split('.');
  return 'R$ ' + inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + dec;
}

export default function App() {
  const [quantidades, setQuantidades] = useState({}); // { idProduto: qtd }
  const [pedido, setPedido] = useState([]); // [{ id, nome, preco, qtd }]
  const [finalizado, setFinalizado] = useState(false);
  const [mensagem, setMensagem] = useState('');

  function alterarQtd(id, delta) {
    const atual = quantidades[id] || 0;
    const nova = Math.max(0, atual + delta);
    setQuantidades({ ...quantidades, [id]: nova });
  }

  function adicionar(produto) {
    const qtd = quantidades[produto.id] || 0;
    if (qtd <= 0) {
      setMensagem(`Selecione a quantidade de "${produto.nome}".`);
      return;
    }
    const existente = pedido.find((i) => i.id === produto.id);
    if (existente) {
      setPedido(pedido.map((i) => (i.id === produto.id ? { ...i, qtd: i.qtd + qtd } : i)));
    } else {
      setPedido([...pedido, { id: produto.id, nome: produto.nome, preco: produto.preco, qtd }]);
    }
    setQuantidades({ ...quantidades, [produto.id]: 0 });
    setMensagem('');
    setFinalizado(false);
  }

  function removerItem(id) {
    setPedido(pedido.filter((i) => i.id !== id));
    setFinalizado(false);
  }

  function finalizar() {
    if (pedido.length === 0) {
      setMensagem('Adicione ao menos um item ao pedido.');
      return;
    }
    setMensagem('');
    setFinalizado(true);
  }

  function novoPedido() {
    setPedido([]);
    setQuantidades({});
    setFinalizado(false);
    setMensagem('');
  }

  const total = pedido.reduce((soma, i) => soma + i.preco * i.qtd, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.titulo}>🥪 Lanchonete Universitária</Text>

      <Text style={styles.secao}>Cardápio</Text>
      {PRODUTOS.map((p) => (
        <View key={p.id} style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>{p.nome}</Text>
            <Text style={styles.preco}>{moeda(p.preco)}</Text>
          </View>
          <View style={styles.contador}>
            <Pressable style={styles.btnQtd} onPress={() => alterarQtd(p.id, -1)}>
              <Text style={styles.btnQtdTexto}>−</Text>
            </Pressable>
            <Text style={styles.qtd}>{quantidades[p.id] || 0}</Text>
            <Pressable style={styles.btnQtd} onPress={() => alterarQtd(p.id, 1)}>
              <Text style={styles.btnQtdTexto}>+</Text>
            </Pressable>
          </View>
          <Pressable style={styles.btnAdd} onPress={() => adicionar(p)}>
            <Text style={styles.btnAddTexto}>Adicionar</Text>
          </Pressable>
        </View>
      ))}

      {mensagem !== '' && <Text style={styles.erro}>{mensagem}</Text>}

      <Text style={styles.secao}>Seu pedido</Text>
      {pedido.length === 0 && <Text style={styles.vazio}>Nenhum item no pedido.</Text>}
      {pedido.map((i) => (
        <View key={i.id} style={styles.itemPedido}>
          <View style={{ flex: 1 }}>
            <Text style={styles.nome}>
              {i.qtd}x {i.nome}
            </Text>
            <Text style={styles.preco}>
              {moeda(i.preco)} cada — subtotal {moeda(i.preco * i.qtd)}
            </Text>
          </View>
          <Pressable style={styles.btnRemover} onPress={() => removerItem(i.id)}>
            <Text style={styles.btnAddTexto}>Remover</Text>
          </Pressable>
        </View>
      ))}

      <Text style={styles.total}>Total: {moeda(total)}</Text>

      {!finalizado ? (
        <Pressable style={styles.btnFinalizar} onPress={finalizar}>
          <Text style={styles.btnFinalizarTexto}>Finalizar pedido</Text>
        </Pressable>
      ) : (
        <View style={styles.resumo}>
          <Text style={styles.resumoTitulo}>✅ Resumo final</Text>
          {pedido.map((i) => (
            <Text key={i.id} style={styles.resumoLinha}>
              {i.qtd}x {i.nome} ({moeda(i.preco)}) = {moeda(i.preco * i.qtd)}
            </Text>
          ))}
          <Text style={styles.resumoTotal}>Total a pagar: {moeda(total)}</Text>
          <Pressable style={[styles.btnFinalizar, { backgroundColor: '#7f8c8d' }]} onPress={novoPedido}>
            <Text style={styles.btnFinalizarTexto}>Novo pedido</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff7e6', padding: 20, paddingTop: 70, flexGrow: 1 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#9c5700', textAlign: 'center', marginBottom: 12 },
  secao: { fontSize: 20, fontWeight: 'bold', color: '#9c5700', marginTop: 18, marginBottom: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0d9a8',
    gap: 8,
  },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  preco: { fontSize: 14, color: '#666' },
  contador: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  btnQtd: { backgroundColor: '#f0d9a8', width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  btnQtdTexto: { fontSize: 20, fontWeight: 'bold', color: '#9c5700' },
  qtd: { fontSize: 17, fontWeight: 'bold', minWidth: 20, textAlign: 'center' },
  btnAdd: { backgroundColor: '#d68910', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8 },
  btnAddTexto: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  erro: { color: '#c0392b', textAlign: 'center', marginTop: 6, fontSize: 15 },
  vazio: { color: '#777', fontStyle: 'italic' },
  itemPedido: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdebd0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    gap: 8,
  },
  btnRemover: { backgroundColor: '#b03a2e', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8 },
  total: { fontSize: 24, fontWeight: 'bold', color: '#9c5700', marginTop: 14, textAlign: 'right' },
  btnFinalizar: { backgroundColor: '#1e8449', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 14 },
  btnFinalizarTexto: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  resumo: { backgroundColor: '#d5f5e3', padding: 16, borderRadius: 10, marginTop: 14 },
  resumoTitulo: { fontSize: 20, fontWeight: 'bold', color: '#145a32', marginBottom: 8 },
  resumoLinha: { fontSize: 15, marginBottom: 3 },
  resumoTotal: { fontSize: 20, fontWeight: 'bold', color: '#145a32', marginTop: 8 },
});
