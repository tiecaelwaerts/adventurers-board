import { useState } from 'react';
import './combat.css';
import Colosseum from '/src/assets/images/colosseum.jpg';

export default function Combat() {
    const [weapons, setWeapons] = useState([]);
    const [spells, setSpells] = useState([]);
    const [spellList, setSpellList] = useState([]);
    const [skillName, setSkillName] = useState('');
    const [skills, setSkills] = useState([]);
    const [diceCount, setDiceCount] = useState(1);
    const [d4, setD4] = useState();
    const [d6, setD6] = useState();
    const [d8, setD8] = useState();
    const [d10, setD10] = useState();
    const [d12, setD12] = useState();
    const [d20, setD20] = useState();
    const [d100, setD100] = useState();

    const skillPrompt = () => {
        return (
            <div>
            <input
                name='name'
                type='text'
                value={skillName}
                onChange={(event) => setSkillName(event.target.value)}
                placeholder='Enter name'
            />
            <label htmlFor='modifier'>Choose a modifier:</label>
            <select id='modifier'>
                <option value='STR'>Strength</option>
                <option value='DEX'>Dexterity</option>
                <option value='CON'>Constitution</option>
                <option value='INT'>Intelligence</option>
                <option value='WIS'>Wisdom</option>
                <option value='CHA'>Charisma</option>
            </select>
            <label htmlFor='diceCount'>Number of dice:</label>
            <input
                name='diceCount'
                type='number'
                value={diceCount}
                min='1'
                onChange={(event) => setDiceCount(event.target.value)}
            />
            <label htmlFor='diceType'>Die type:</label>
            <select id='diceType'>
                <option value='4'>d4</option>
                <option value='6'>d6</option>
                <option value='8'>d8</option>
                <option value='10'>d10</option>
                <option value='12'>d12</option>
                <option value='20'>d20</option>
                <option value='100'>d100</option>
            </select>
            <button onClick={() => addSkill(skillName, modifier.value, diceCount, diceType.value)}>Add Skill</button>
            </div>
        )
    }

    const addSkill = (name, modifier, diceAmount, diceValue) => {
        setSkills([...skills, {name: name, atk: modifier, dmg: `${diceAmount}d${diceValue}`, die: diceValue}]);
        console.log(skills);
    }

    const deleteSkill = (index) => {
        const newSkills = skills.filter((skill, i) => index !== i);
        setSkills(newSkills);
    }

    const spellSelect = () => {
        return (
            <>
            <label htmlFor='spellOptions'>Add Spell: </label>
            <select id='spellOptions'>
                {spellList.map((spell, index) => (
                    <option key={index} value={JSON.stringify(spell)}>{spell.name}</option>
                ))}
            </select>
            <button onClick={() => addSpell(spellOptions.value)}>Add Spell</button>
            </>
        )
    }

    const addSpell = (newSpell) => {
        setSpells([...spells, JSON.parse(newSpell)]);
    }

    const deleteSpell = (index) => {
        const newSpells = spells.filter((spell, i) => index !== i);
        setSpells(newSpells);
    }

    const deleteWeapon = (index) => {
        const newWeapons = weapons.filter((weapon, i) => index !== i);
        setWeapons(newWeapons);
    }

    function diceRoll(min, max, modifier) {
        const result = Math.floor(Math.random() * (max - min) + min + modifier);
        console.log(result);
        if (max - min === 4) {
            setD4(result);
        } else if (max - min === 6) {
            setD6(result);
        } else if (max - min === 8) {
            setD8(result);
        } else if (max - min === 10) {
            setD10(result);
        } else if (max - min === 12) {
            setD12(result);
        } else if (max - min === 20) {
            setD20(result);
        } else {
            setD100(result);
        }
    }

    return (
        <div>
            <div>
                <header className="colosseum-header">
                    <img src={Colosseum} alt="A colosseum full of people" className="header-image"></img>
                </header>
            </div>
            <div className="combat">
                {/* Display weapons from inventory with their damage and attack modifiers. Choose spells to display */}
                <section className='weapons'>
                    <h3>Weapons</h3>
                    {weapons.map((weapon, index) => (
                        <p key={index}><span>{weapon.name}</span> <button onClick={() => diceRoll(1, 21, weapon.atk)}>To Hit: +{weapon.atk}</button> 
                        <button onClick={() => diceRoll(1, (weapon.die + 1), 0)}>Damage: {weapon.dmg}</button> <button onClick={() => deleteWeapon(index)}>X</button></p>
                    ))}
                </section>
                
                <section className='spells'>
                    <h3>Spells</h3>
                    {spells.map((spell, index) => (
                        <p key={index}><span>{spell.name}</span> {spell.atk === null ? <span>DC: {spell.dc}</span> : <button onClick={() => diceRoll(1, 21, spell.atk)}>To Hit: +{spell.atk}</button>} 
                        <button onClick={() => diceRoll(1, (spell.die + 1), 0)}>Damage: {spell.dmg}</button> <button onClick={() => deleteSpell(index)}>X</button></p>
                    ))}
                    {spellSelect()}
                </section>

                <section className='skills'>
                    <h3>Skills</h3>
                    {skills.map((skill, index) => (
                        <p key={index}><span>{skill.name}</span> <button onClick={() => diceRoll(1, 21, skill.atk)}>To Hit: +{skill.atk}</button> 
                        <button onClick={() => diceRoll(1, (skill.die + 1), 0)}>Damage: {skill.dmg}</button> <button onClick={() => deleteSkill(index)}>X</button></p>
                    ))}
                    {skillPrompt()}
                </section>
            </div>
            <div className='dice'>
                {/* Roll a dice */}
                <button onClick={() => diceRoll(1, 5, 0)}>d4: {d4}</button>
                <button onClick={() => diceRoll(1, 7, 0)}>d6: {d6}</button>
                <button onClick={() => diceRoll(1, 9, 0)}>d8: {d8}</button>
                <button onClick={() => diceRoll(1, 11, 0)}>d10: {d10}</button>
                <button onClick={() => diceRoll(1, 13, 0)}>d12: {d12}</button>
                <button onClick={() => diceRoll(1,21, 0)}>d20: {d20}</button>
                <button onClick={() => diceRoll(1, 101, 0)}>d100: {d100}</button>
            </div>
        </div>
    )
}