import { useRef, useState } from 'react';
import { ImagePlus, X, LoaderCircle, ShieldCheck } from 'lucide-react';
import { photoLimits } from '@/data/network-application';
import { preparePhoto, type PreparedPhoto } from '@/lib/photo-processing';

type PhotoUploaderProps = {
  photos: PreparedPhoto[];
  onChange: (photos: PreparedPhoto[]) => void;
  onError: (message: string) => void;
};

export function PhotoUploader({ photos, onChange, onError }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const incoming = Array.from(fileList);
    const room = photoLimits.maxFiles - photos.length;
    if (room <= 0) {
      onError(`Pode anexar no máximo ${photoLimits.maxFiles} fotografias.`);
      return;
    }
    const toProcess = incoming.slice(0, room);
    if (incoming.length > room) {
      onError(`Apenas as primeiras ${room} fotografias foram adicionadas (limite de ${photoLimits.maxFiles}).`);
    }

    setProcessing(true);
    const prepared: PreparedPhoto[] = [];
    for (const file of toProcess) {
      const result = await preparePhoto(file);
      if (result.photo) {
        prepared.push(result.photo);
      } else if (result.error) {
        onError(`${file.name}: ${result.error}`);
      }
    }
    if (prepared.length > 0) {
      onChange([...photos, ...prepared]);
    }
    setProcessing(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  function removeAt(index: number) {
    const next = photos.filter((_, i) => i !== index);
    // Revoke the preview URL of the removed photo to free memory.
    URL.revokeObjectURL(photos[index].previewUrl);
    onChange(next);
  }

  const remaining = photoLimits.maxFiles - photos.length;

  return (
    <div className="photo-uploader">
      <input
        ref={inputRef}
        type="file"
        accept={photoLimits.accept}
        multiple
        className="photo-input"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={processing || remaining <= 0}
        id="photos"
        aria-label="Anexar fotografias"
      />

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div className="photo-tile" key={photo.previewUrl}>
            <img src={photo.previewUrl} alt={`Pré-visualização da fotografia ${index + 1}`} />
            <button
              type="button"
              className="photo-remove"
              onClick={() => removeAt(index)}
              aria-label={`Remover fotografia ${index + 1}`}
            >
              <X size={14} />
            </button>
            {index === 0 ? <span className="photo-badge">Principal</span> : null}
          </div>
        ))}

        {remaining > 0 ? (
          <button
            type="button"
            className="photo-add"
            onClick={() => inputRef.current?.click()}
            disabled={processing}
            aria-label="Adicionar fotografia"
          >
            {processing ? (
              <LoaderCircle size={22} className="submission-spinner" />
            ) : (
              <ImagePlus size={22} />
            )}
            <span>{photos.length === 0 ? 'Adicionar fotografias' : 'Adicionar mais'}</span>
            <small>{remaining} restante{remaining > 1 ? 's' : ''}</small>
          </button>
        ) : null}
      </div>

      <p className="photo-note">
        <ShieldCheck size={12} />
        Até {photoLimits.maxFiles} fotografias · JPG, PNG ou WebP · máx. 5 MB cada. Os metadados
        (incluindo localização) são removidos automaticamente antes do envio.
      </p>
    </div>
  );
}
