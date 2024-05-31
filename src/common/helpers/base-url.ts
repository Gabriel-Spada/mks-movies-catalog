export const JsonBaseTransformer =
  {
    to(data: string): string {
      return data;
    },
    from(data: any): string {
      if (!data) {
        return null;
      }
      return JSON.stringify(data);
    },
  };

export const NormalizeName =
  {
    to(name: string): string {
      if (name && name.length > 0)
        return name.split('').filter(char => validNameCarecters.includes(char)).join('').trimEnd();
      return name;
    },
    from(name: string): string {
      return name;
    },
  };



export const validNameCarecters = [
  'a', 'á', 'à', 'â', 'ã', 'ä',
  'b',
  'c', 'ç',
  'd',
  'e', 'é', 'è', 'ê', 'ë',
  'f',
  'g',
  'h',
  'i', 'í', 'ì', 'î', 'ï',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o', 'ó', 'ò', 'ô', 'õ', 'ö',
  'p',
  'q',
  'r',
  's',
  't',
  'u', 'ú', 'ù', 'û', 'ü',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A', 'Á', 'À', 'Â', 'Ã', 'Ä',
  'B',
  'C', 'Ç',
  'D',
  'E', 'É', 'È', 'Ê', 'Ë',
  'F',
  'G',
  'H',
  'I', 'Í', 'Ì', 'Î', 'Ï',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O', 'Ó', 'Ò', 'Ô', 'Õ', 'Ö',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U', 'Ú', 'Ù', 'Û', 'Ü',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '-',
  ' '];

