function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    var ds = DatasetBuilder.newDataset();

    ds.addColumn("id");
    ds.addColumn("filial");

    ds.addRow(new Array("Barra Funda", "Matriz"));
    ds.addRow(new Array("Osasco", "Filial"));
    ds.addRow(new Array("Carapicuíba", "Filial"));
    ds.addRow(new Array("Guarulhos", "Filial"));
    ds.addRow(new Array("Barueri", "Filial"));
    

    return ds;
}function onMobileSync(user) {

}