"""Register the sidebar panel."""

from __future__ import annotations

import hashlib
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback

from .const import (
    CONF_ADMIN_ONLY,
    DOMAIN,
    PANEL_COMPONENT,
    PANEL_FILENAME,
    PANEL_ICON,
    PANEL_URL_PATH,
    STATIC_URL,
    TITLE,
)

FRONTEND_DIR = Path(__file__).parent / "frontend"
_STATIC_REGISTERED = f"{DOMAIN}_static_registered"


def _file_hash(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:12]


async def async_register_panel(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Serve the frontend bundle and add the panel to the sidebar."""
    # Static routes cannot be removed again, so only register them once.
    if not hass.data.get(_STATIC_REGISTERED):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), cache_headers=True)]
        )
        hass.data[_STATIC_REGISTERED] = True

    # A content hash in the URL makes browsers load a new bundle after updates.
    version = await hass.async_add_executor_job(_file_hash, FRONTEND_DIR / PANEL_FILENAME)
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_COMPONENT,
        sidebar_title=TITLE,
        sidebar_icon=PANEL_ICON,
        module_url=f"{STATIC_URL}/{PANEL_FILENAME}?v={version}",
        embed_iframe=False,
        require_admin=entry.options.get(CONF_ADMIN_ONLY, False),
        config={},
    )


@callback
def async_unregister_panel(hass: HomeAssistant) -> None:
    """Remove the panel from the sidebar."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
