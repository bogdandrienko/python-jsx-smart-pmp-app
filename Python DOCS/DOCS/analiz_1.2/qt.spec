# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(['C:/Users/Bogdan/Desktop/video_analiz/qt.py'],
             pathex=['C:\\Users\\Bogdan\\Desktop\\video_analiz'],
             binaries=[],
             datas=[('C:/Users/Bogdan/Desktop/video_analiz/icon.ico', '.'), ('C:/Users/Bogdan/Desktop/video_analiz/mask.jpg', '.'), ('C:/Users/Bogdan/Desktop/video_analiz/mask_black.jpg', '.'), ('C:/Users/Bogdan/Desktop/video_analiz/mask_white.jpg', '.'), ('C:/Users/Bogdan/Desktop/video_analiz/PySide6', 'PySide6/')],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=True)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [('v', None, 'OPTION')],
          name='qt',
          debug=True,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=False , icon='C:\\Users\\Bogdan\\Desktop\\video_analiz\\icon.ico')
