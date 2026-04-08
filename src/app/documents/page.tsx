import { FileText, Upload, Image, FileSpreadsheet, Eye, Download, Trash2, Clock } from "lucide-react";

const documents = [
  {
    id: "1",
    name: "Factura_Febrero_2026.pdf",
    type: "FACTURA",
    size: "245 KB",
    uploadedAt: "Hace 2 horas",
    status: "processed",
    items: 18,
  },
  {
    id: "2",
    name: "Reporte_MercadoLibre_Enero.csv",
    type: "REPORTE",
    size: "1.2 MB",
    uploadedAt: "Hace 1 día",
    status: "processed",
    items: 847,
  },
  {
    id: "3",
    name: "Inventario_Actualizado.xlsx",
    type: "INVENTARIO",
    size: "890 KB",
    uploadedAt: "Hace 3 días",
    status: "processed",
    items: 156,
  },
  {
    id: "4",
    name: "Foto_Producto_Camisa_001.jpg",
    type: "FOTO",
    size: "2.4 MB",
    uploadedAt: "Hace 5 días",
    status: "processed",
    items: 1,
  },
  {
    id: "5",
    name: "Factura_Enero_2026.pdf",
    type: "FACTURA",
    size: "230 KB",
    uploadedAt: "Hace 1 mes",
    status: "processed",
    items: 15,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "FACTURA":
      return <FileText className="h-8 w-8 text-emerald-400" />;
    case "REPORTE":
      return <FileSpreadsheet className="h-8 w-8 text-blue-400" />;
    case "FOTO":
      return <Image className="h-8 w-8 text-purple-400" />;
    case "INVENTARIO":
      return <FileSpreadsheet className="h-8 w-8 text-amber-400" />;
    default:
      return <FileText className="h-8 w-8 text-zinc-400" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "FACTURA":
      return "bg-emerald-500/10 text-emerald-400";
    case "REPORTE":
      return "bg-blue-500/10 text-blue-400";
    case "FOTO":
      return "bg-purple-500/10 text-purple-400";
    case "INVENTARIO":
      return "bg-amber-500/10 text-amber-400";
    default:
      return "bg-zinc-500/10 text-zinc-400";
  }
};

export default function DocumentsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] tracking-tight">Documentos</h1>
          <p className="text-zinc-400 mt-1">Sube facturas, reportes y fotos para procesar</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-[#27272A] hover:border-emerald-500/50 rounded-xl p-12 mb-8 transition-colors cursor-pointer group">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-[#27272A] flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 transition-colors">
            <Upload className="h-8 w-8 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            Arrastra archivos aquí o haz clic para seleccionar
          </h3>
          <p className="text-sm text-zinc-400 mb-4">
            Soporta PDF, Excel, CSV, JPG, PNG
          </p>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="px-2 py-1 bg-[#27272A] rounded">PDF</span>
            <span className="px-2 py-1 bg-[#27272A] rounded">XLSX</span>
            <span className="px-2 py-1 bg-[#27272A] rounded">CSV</span>
            <span className="px-2 py-1 bg-[#27272A] rounded">JPG</span>
            <span className="px-2 py-1 bg-[#27272A] rounded">PNG</span>
          </div>
        </div>
      </div>

      {/* Document Types */}
      <h3 className="text-lg font-semibold mb-4">Tipos de Documentos Soportados</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-[#27272A] p-4 border border-white/5">
          <FileText className="h-6 w-6 text-emerald-400 mb-2" />
          <h4 className="font-medium text-white mb-1">Facturas</h4>
          <p className="text-xs text-zinc-400">Proveedor, compras, entradas de inventario</p>
        </div>
        <div className="rounded-xl bg-[#27272A] p-4 border border-white/5">
          <FileSpreadsheet className="h-6 w-6 text-blue-400 mb-2" />
          <h4 className="font-medium text-white mb-1">Reportes</h4>
          <p className="text-xs text-zinc-400">Ventas, marketplace, export CSV</p>
        </div>
        <div className="rounded-xl bg-[#27272A] p-4 border border-white/5">
          <Image className="h-6 w-6 text-purple-400 mb-2" />
          <h4 className="font-medium text-white mb-1">Fotos</h4>
          <p className="text-xs text-zinc-400">Productos para generar descripciones</p>
        </div>
        <div className="rounded-xl bg-[#27272A] p-4 border border-white/5">
          <FileSpreadsheet className="h-6 w-6 text-amber-400 mb-2" />
          <h4 className="font-medium text-white mb-1">Inventarios</h4>
          <p className="text-xs text-zinc-400">Listas de stock, catálogos</p>
        </div>
      </div>

      {/* Recent Documents */}
      <h3 className="text-lg font-semibold mb-4">Documentos Recientes</h3>
      <div className="rounded-xl bg-[#27272A] border border-white/5 overflow-hidden">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-[#1f1f22]/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-[#1f1f22] flex items-center justify-center">
              {getIcon(doc.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(doc.type)}`}>
                  {doc.type}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-zinc-500">{doc.size}</span>
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {doc.uploadedAt}
                </span>
                <span className="text-xs text-zinc-500">
                  {doc.items} {doc.items === 1 ? 'item' : 'items'} procesados
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {doc.status === 'processed' && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">
                  Procesado
                </span>
              )}
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Eye className="h-4 w-4 text-zinc-400" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Download className="h-4 w-4 text-zinc-400" />
              </button>
              <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 className="h-4 w-4 text-zinc-400 hover:text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
