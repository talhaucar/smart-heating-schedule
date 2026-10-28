"""Every translation has the same keys and placeholders as English."""

from __future__ import annotations

import json
from pathlib import Path
import re

import pytest

TRANSLATIONS = (
    Path(__file__).parent.parent / "custom_components" / "smart_heating_schedule" / "translations"
)
PLACEHOLDER = re.compile(r"\{\w+\}")


def flatten(value: dict | str, prefix: str = "") -> dict[str, str]:
    if isinstance(value, str):
        return {prefix: value}
    result: dict[str, str] = {}
    for key, child in value.items():
        result.update(flatten(child, f"{prefix}.{key}" if prefix else key))
    return result


ENGLISH = flatten(json.loads((TRANSLATIONS / "en.json").read_text()))


@pytest.mark.parametrize("path", sorted(TRANSLATIONS.glob("*.json")), ids=lambda path: path.stem)
def test_translation_matches_english(path: Path) -> None:
    strings = flatten(json.loads(path.read_text()))
    assert strings.keys() == ENGLISH.keys()
    for key, text in strings.items():
        assert text.strip(), key
        assert sorted(PLACEHOLDER.findall(text)) == sorted(PLACEHOLDER.findall(ENGLISH[key])), key
