import React, { useState, useEffect } from 'react';

import Page from '../layouts/page';
import { VISITOR, VisitorRouter } from '../components/customerPath';
import { MultiChoice } from '../uiComponents';
import { logParcoursClient } from '../utils/client/analytics';

export default () => {
  const [statut, setStatut] = useState<VISITOR | null>(null);

  const options = [
    {
      value: VISITOR.PARTICULIER,
      label: 'un particulier',
    },
    {
      value: VISITOR.ADMINISTRATION,
      label: 'une administration',
    },
    {
      value: VISITOR.COLLECTIVITE,
      label: 'une collectivité',
    },
    {
      value: VISITOR.EDITOR,
      label: 'un éditeur pour une collectivité',
    },
    {
      value: VISITOR.ENTREPRISE,
      label: 'une entreprise',
    },
    {
      value: VISITOR.ASSO,
      label: 'une association',
    },
  ];

  useEffect(() => {
    logParcoursClient('1. Commence le parcours client');
  }, []);

  useEffect(() => {
    if (statut !== null) {
      logParcoursClient('2. Renseigne un statut de visiteur', statut);
    }
  }, [statut]);

  return (
    <Page
      title="Formulaire de contact"
      usePreFooter={false}
      useFooter={false}
      noIndex={true}
    >
      <div className="text-wrapper text-style">
        <h1>
          Bonjour&nbsp;
          <span role="img" aria-label="emoji hello">
            👋
          </span>
          , comment pouvons-nous vous aider&nbsp;?
        </h1>
        <p>Pour commencer, nous aimerions faire connaissance :</p>
        <div className="contact-form-question">
          <div className="question">Qui êtes-vous ?</div>
          <MultiChoice
            selected={statut}
            onClick={setStatut}
            multiChoiceOptions={options}
          />
        </div>
        {statut && <VisitorRouter visitor={statut} />}
      </div>
      <style global jsx>{`
        .contact-form-question {
          margin: 20px 0 0;
        }
        .contact-form-question > div.question {
          font-weight: bold;
        }
      `}</style>
    </Page>
  );
};
