import type { JSX } from "react";

interface HelpPanelProps {
  isVisible: boolean;
  onToggle: () => void;
}

interface GameTipProps {
  icon: string;
  title: string;
  description: string;
}

function GameTip({ icon, title, description }: GameTipProps): JSX.Element {
  return (
    <div className="box is-small mb-3">
      <div className="media">
        <div className="media-left">
          <span className="icon is-medium has-text-primary">
            <span style={{ fontSize: "1.2rem" }}>{icon}</span>
          </span>
        </div>
        <div className="media-content">
          <p className="title is-6 has-text-weight-bold mb-1">{title}</p>
          <p className="subtitle is-7 has-text-grey-dark">{description}</p>
        </div>
      </div>
    </div>
  );
}

interface ResourceLinkProps {
  href: string;
  title: string;
  description: string;
  isExternal?: boolean;
}

function ResourceLink({
  href,
  title,
  description,
  isExternal = true,
}: ResourceLinkProps): JSX.Element {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="box is-clickable has-background-light"
    >
      <div className="media">
        <div className="media-left">
          <span className="icon has-text-link">
            <span>{isExternal ? "🔗" : "📖"}</span>
          </span>
        </div>
        <div className="media-content">
          <p className="title is-6 has-text-link">{title}</p>
          <p className="subtitle is-7 has-text-grey-dark">{description}</p>
        </div>
        {isExternal && (
          <div className="media-right">
            <span className="icon is-small has-text-grey">
              <span>↗️</span>
            </span>
          </div>
        )}
      </div>
    </a>
  );
}

export function HelpPanel({
  isVisible,
  onToggle,
}: HelpPanelProps): JSX.Element {
  return (
    <div className="box">
      <div className="level is-mobile mb-4">
        <div className="level-left">
          <div className="level-item">
            <h3 className="title is-5">💡 Ajuda & Dicas</h3>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <button
              className="button is-small is-ghost"
              onClick={onToggle}
              type="button"
              aria-label={isVisible ? "Ocultar ajuda" : "Mostrar ajuda"}
            >
              <span className="icon">
                <span>{isVisible ? "🔼" : "🔽"}</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {isVisible && (
        <div className="content">
          <div className="mb-5">
            <h4 className="title is-6 has-text-primary mb-3">🎮 Como Jogar</h4>
            <div className="space-y-3">
              <GameTip
                icon="🎯"
                title="Objetivo"
                description="Reorganize os dígitos para formar a cor RGB alvo mostrada ao lado."
              />
              <GameTip
                icon="👆"
                title="Movimento"
                description="Clique em uma célula para selecioná-la, depois clique em uma célula adjacente para trocar os valores."
              />
              <GameTip
                icon="✅"
                title="Progresso"
                description="Células com fundo azul claro estão na posição correta! Mantenha-as no lugar."
              />
              <GameTip
                icon="🔢"
                title="Formação RGB"
                description="Cada linha representa um canal de cor: R (vermelho), G (verde), B (azul). Cada célula é um dígito (0-9)."
              />
            </div>
          </div>

          <div className="notification is-warning is-light mb-5">
            <h4 className="title is-6 has-text-warning-dark mb-2">
              ⚠️ Importante
            </h4>
            <p className="is-size-7">
              <strong>Limitação RGB:</strong> Quando os dígitos formam um valor
              maior que 255, o jogo automaticamente considera como 255. Por
              exemplo, se a linha vermelha contém "2", "7", "8", o valor seria
              278, mas será limitado a 255.
            </p>
          </div>

          <div className="mb-5">
            <h4 className="title is-6 has-text-success mb-3">
              🏆 Sistema de Pontuação
            </h4>
            <div className="space-y-3">
              <GameTip
                icon="⏱️"
                title="Pontuação por Tempo"
                description="Você começa com 90 pontos e perde 1 ponto a cada segundo. O mínimo é 0 pontos."
              />
              <GameTip
                icon="🔄"
                title="Pontuação por Movimentos"
                description="Você começa com 200 pontos e perde 10 pontos a cada movimento (troca de células). O mínimo é 0 pontos."
              />
              <GameTip
                icon="🎯"
                title="Pontuação Global"
                description="Sua pontuação final é a soma da pontuação por tempo e por movimentos. A pontuação máxima possível é 290 pontos!"
              />
            </div>
          </div>

          <div>
            <h4 className="title is-6 has-text-info mb-3">
              📚 Recursos Educacionais
            </h4>
            <div className="space-y-2">
              <ResourceLink
                href="https://pt.wikipedia.org/wiki/RGB"
                title="Sistema de Cores RGB"
                description="Entenda como funciona o modelo de cores RGB na Wikipedia em português."
              />
              <ResourceLink
                href="https://www.w3schools.com/colors/colors_rgb.asp"
                title="Tutorial RGB - W3Schools"
                description="Tutorial interativo sobre cores RGB com exemplos práticos."
              />
              <ResourceLink
                href="https://www.rapidtables.com/web/color/RGB_Color.html"
                title="Conversor de Cores RGB"
                description="Ferramenta para converter e experimentar com valores RGB."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
