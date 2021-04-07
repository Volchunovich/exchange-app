import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { runInAction } from 'mobx';
import React, { useState } from 'react';
import { useStore } from '../../../../utils/ioc.util';
import { LanguageStore, LanguageType } from '../Language.store';
import { useHeaderLanguageStyles } from './HeaderLanguage.styles';

const HeaderLanguage = () => {
  const classes = useHeaderLanguageStyles();
  const langStore = useStore(LanguageStore);
  const [lang, setLang] = useState<LanguageType>('en');

  const handleLangChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    e.preventDefault();
    setLang(e.target.value as LanguageType);
    runInAction(() => {
      langStore.currentLanguage = e.target.value as LanguageType;
    });
  };

  return (
    <FormControl className={classes.root}>
      <InputLabel id='demo-simple-select-label'>Language</InputLabel>
      <Select
        // labelId='demo-simple-select-label'
        id='lang-select-id'
        value={lang}
        onChange={handleLangChange}>
        <MenuItem value='en'>ENG</MenuItem>
        <MenuItem value='ru'>RUS</MenuItem>
      </Select>
    </FormControl>
  );
};

export default HeaderLanguage;
