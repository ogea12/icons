# @ogea12/icons

<div align="center">

![Version](https://img.shields.io/npm/v/@ogea12/icons?style=for-the-badge&colorA=4c566a&colorB=5382a1&logo=npm&logoColor=white)
![Code Size](https://img.shields.io/github/languages/code-size/ogea12/icons?style=for-the-badge&colorA=4c566a&colorB=ebcb8b&logo=github&logoColor=white)
![License](https://img.shields.io/github/license/ogea12/icons?style=for-the-badge&colorA=4c566a&colorB=a3be8c)

</div>

`@ogea12/icons` est un package se présentant comme une bibliothèque d'icônes inspirée de [Lucide React](https://lucide.dev/guide/packages/lucide-react), offrant ainsi une collection d'icônes complète et facilement utilisable, qui reflète l'identité visuelle de l'OGEA 12.

## Premiers pas

### Installation

Pour utiliser le package, vous devez d'abord l'intégrer dans votre projet.

```shell
npm install @ogea12/icons

# Assurez-vous également d'installer le package suivant
npm install react
```

### Utilisation

Une fois l'installation terminée, vous pouvez ajouter les icônes à votre interface. L'exemple ci-dessous ne montre pas toutes les façons possibles de personnaliser l'apparence d'une icône.

```tsx
import { BriefcaseIcon, ChevronDownIcon } from '@ogea12/icons'

export default function Home() {
  return (
    <>
      {/* Using Tailwind CSS classes for styling */}
      <ChevronDownIcon className="text-slate-700" />
      <BriefcaseIcon className="stroke-slate-400 text-slate-700" size={48} />
    </>
  )
}
```
