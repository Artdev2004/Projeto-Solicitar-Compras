function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();

    ds.addColumn("centro");
    ds.addColumn("id");

    ds.addRow(new Array("TI", "1234"));
    ds.addRow(new Array("Almoxarifado", "3456"));
    ds.addRow(new Array("Tesouraria", "9405"));
    ds.addRow(new Array("RH", "9405"));
    ds.addRow(new Array("Escritório", "9405"));

    return ds;

}function onMobileSync(user) {

}